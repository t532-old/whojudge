import { prisma, ID_Input, String, TestcaseResultCreateInput, Submission, SubmissionStatus, TestcaseResult } from '../../prisma-client'
import { WhojudgeContext } from '../../context'
import { createSubmission as createAliceSubmission, testSubmission } from '@whojudge/alice'
import { createReadStream } from 'streamifier'
import * as ruleset from '../../config/rules'

interface CreateSubmissionInput {
    problem: ID_Input
    code: String
    language: String
}

enum StatusMapping {
    UKE = 'UNKNOWN_ERROR',
    MLE = 'MEMORY_LIMIT_EXCEEDED',
    OLE = 'OUTPUT_LIMIT_EXCEEDED',
    TLE = 'TIME_LIMIT_EXCEEDED',
    RE = 'RUNTIME_ERROR',
    AC = 'ACCEPTED',
    PC = 'PARTIALLY_CORRECT',
    WA = 'WRONG_ANSWER',
    SJE = 'SPECIAL_JUDGE_ERROR'
}

export async function createSubmission(_1, { problem, code, language }: CreateSubmissionInput, ctx: WhojudgeContext) {
    const result = await prisma.createSubmission({
        user: { connect: { id: ctx.user.id } },
        problem: { connect: { id: problem } },
        code,
        language,
        status: 'JUDGING',
        detail: {
            create: (await ctx.problem_s().testcases()).map<TestcaseResultCreateInput>((_, idx) => ({
                order: idx,
                time: 0,
                memory: 0,
                point: 0,
                status: 'JUDGING',
            }))
        }
    })
    const { success } = await createAliceSubmission(result.id, createReadStream(code), language)
    let judgePromise: Promise<any>
    let detail: TestcaseResult[]
    if (success) {
        judgePromise = Promise.all((await ctx.problem_s().testcases()).map(async (tc, idx) => {
            const caseResult = await testSubmission(
                result.id, 
                `${ctx.problem.id}-${idx}`,
                ctx.problem.id,
                language, {
                time: tc.time,
                memory: tc.memory
            })
            detail = await prisma.updateSubmission({
                where: { id: result.id },
                data: {
                    detail: {
                        updateMany: {
                            where: { order: idx },
                            data: {
                                time: caseResult.time,
                                memory: caseResult.memory,
                                point: caseResult.points * tc.point,
                                status: StatusMapping[caseResult.status],
                            }
                        }
                    }
                }
            }).detail()
        }))
    } else {
        judgePromise = void async function() {
            detail = await prisma.updateSubmission({
                where: { id: result.id },
                data: {
                    detail: {
                        updateMany: {
                            where: {},
                            data: { status: 'COMPILE_ERROR' },
                        },
                    },
                    status: 'ERROR',
                }
            }).detail()
        }()
    }
    void async function afterJudge() {
        await judgePromise
        const data: { status: SubmissionStatus } = { status: 'ERROR' }
        if (detail.every(i => i.status !== 'JUDGING')) {
            if (detail.every(i =>
                ['COMPILE_ERROR', 'SPECIAL_JUDGE_ERROR'].includes(i.status)))
                data.status = 'ERROR'
            else if (detail.every(i => i.status === 'ACCEPTED'))
                data.status = 'ACCEPTED'
            else data.status = 'NOT_ACCEPTED'
            await prisma.updateSubmission({
                where: { id: result.id },
                data,
            })
            if (ctx.scope.isLinear) {
                await prisma.updateParticipant({
                    where: { id: ctx.participant.id },
                    data: { step: Math.max(ctx.participant.step, ctx.problem.order + 1) },
                })
            }
            if (ctx.scope.isContest) {
                await ruleset[ctx.scope.contestMode].update(ctx.participant.score[ctx.problem.order], () => prisma.submission({ id: result.id }), ctx)
                const rst = await prisma.updateParticipant({
                    where: { id: ctx.participant.id },
                    data: {
                        score: { set: ctx.participant.score },
                    }
                })
                console.log(rst.score)
            }
        }
    }()
    return result
}

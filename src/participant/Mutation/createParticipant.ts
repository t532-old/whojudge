import { prisma, ParticipantCreateInput } from '../../prisma-client'
import { WhojudgeContext } from '../../context'
import * as ruleset from '../../config/rules'
import { ApolloError } from 'apollo-server-koa'

export async function createParticipant(_1, _2, ctx: WhojudgeContext) {
    const hasParticipant = await prisma.$exists.participant({
        user: { id: ctx.user.id },
        scope: { id: ctx.scope.id },
    })
    if (hasParticipant)
        throw new ApolloError('Already participated', 'WHOJ_PART_EXIST')
    const participant: ParticipantCreateInput = {
        scope: { connect: { id: ctx.scope.id } },
        user: { connect: { id: ctx.user.id } },
    }
    if (ctx.scope.isLinear) {
        participant.step = 0
        participant.skippedStep = 0
    }
    if (ctx.scope.isContest) {
        const problemCount = await prisma.problemsConnection({ where: { scope: { id: ctx.scope.id } } })
            .aggregate()
            .count()
        participant.score = {
            set: new Array(problemCount)
                .fill(null)
                .map(_ => ruleset[ctx.scope.contestMode].init())
        }
    }
    return prisma.createParticipant(participant)
}

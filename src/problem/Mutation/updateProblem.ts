import { prisma, ID_Input } from '../../prisma-client'
import { updateSpecialJudge } from '@whojudge/alice'
import { createReadStream } from 'streamifier'
import { ApolloError } from 'apollo-server-koa'
import { WhojudgeContext } from '../../context'

interface UpdateProblemInput {
    id: ID_Input
    data: any
}

export async function updateProblem(_, { id, data }: UpdateProblemInput, ctx: WhojudgeContext) {
    const preData: any = {}
    if (data.examples) {
        preData.examples = { deleteMany: {} }
        data.examples = { create: data.examples }
    }
    if (data.testcases) {
        preData.testcases = { deleteMany: {} }
        data.testcases = { create: data.testcases }
    }
    if (data.tags)
        { data.tags = { set: data.tags } }
    if ('order' in data) {
        const swapped = await prisma.updateManyProblems({
            where: {
                scope: { id: ctx.scope.id },
                order: data.order,
            },
            data: { order: ctx.problem.order }
        })
        if (!Number(swapped.count))
            throw new ApolloError('Problem does not exist', 'WHOJ_PROB_NEXIST')
    }
    await prisma.updateProblem({
        where: { id },
        data: preData,
    })
    const result = await prisma.updateProblem({
        where: { id },
        data,
    })
    if (result && data.spj)
        { updateSpecialJudge(result.id, createReadStream(data.spj)) }
    return result
}

import { prisma, ID_Input } from '../../prisma-client'
import { updateSpecialJudge } from '@whojudge/alice'
import { createReadStream } from 'streamifier'
import { ApolloError } from 'apollo-server-koa'

interface UpdateProblemInput {
    id: ID_Input
    data: any
}

export async function updateProblem(_, { id, data }: UpdateProblemInput) {
    const preData: any = {}
    if (data.examples) {
        preData.examples = { deleteMany: {} }
        data.examples = { create: data.examples }
    }
    if (data.testcases) {
        preData.testcases = { deleteMany: {} }
        data.testcases = { create: data.examples }
    }
    if (data.tags)
        { data.tags = { set: data.tags } }
    if (data.order) {
        const { scope, order } = prisma.problem({ id })
        const swapped = await prisma.updateManyProblems({
            where: {
                scope: { id: await scope().id() },
                order: await order(),
            },
            data: { order: data.order }
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

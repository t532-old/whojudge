import { prisma, ID_Input } from '../../prisma-client'
import { updateSpecialJudge } from '@whojudge/alice'
import { createReadStream } from 'streamifier'

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

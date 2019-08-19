import { prisma, ID_Input } from '../../prisma-client'

interface ProblemInput {
    id: ID_Input
}

export async function problem(_, args: ProblemInput) {
    return prisma.problem(args)
}

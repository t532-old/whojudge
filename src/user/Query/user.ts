import { prisma, ID_Input } from '../../prisma-client'

interface UserInput {
    id: ID_Input
}

export function user(_, args: UserInput) {
    return prisma.user(args)
}

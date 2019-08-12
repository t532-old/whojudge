import { prisma, ID_Input } from '../../prisma-client'

interface TokenInput {
    id: ID_Input
}

export function token(_, args: TokenInput) {
    return prisma.token(args)
}

import { prisma, String } from '../../prisma-client'

interface TokenInput {
    token: String
}

export function token(_, args: TokenInput) {
    return prisma.token(args)
}

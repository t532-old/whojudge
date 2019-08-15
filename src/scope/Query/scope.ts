import { prisma, ID_Input } from '../../prisma-client'

interface ScopeInput {
    id: ID_Input
}

export function scope(_, args: ScopeInput) {
    return prisma.scope(args)
}

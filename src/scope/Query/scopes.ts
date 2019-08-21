import { prisma, ScopeWhereInput, ScopeOrderByInput, Int } from '../../prisma-client'

interface ScopesInput {
    where?: ScopeWhereInput
    orderBy?: ScopeOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export async function scopes(_, args: ScopesInput) {
    return prisma.scopes(args)
}

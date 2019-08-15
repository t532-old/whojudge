import { prisma, ID_Input, ScopeUpdateInput } from '../../prisma-client'

interface UpdateScopeInput {
    id: ID_Input
    data: ScopeUpdateInput
}

export async function updateScope(_, args: UpdateScopeInput) {
    return prisma.updateScope({
        where: { id: args.id },
        data: args.data,
    })
}

import { prisma, ID_Input } from '../../prisma-client'

interface DeleteScopeInput {
    id: ID_Input
}

export async function deleteScope(_, args: DeleteScopeInput) {
    return prisma.deleteScope(args)
}

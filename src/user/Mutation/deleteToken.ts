import { prisma, ID_Input } from '../../prisma-client'

interface DeleteTokenInput {
    id: ID_Input
}

export async function deleteToken(_, args: DeleteTokenInput) {
    return prisma.deleteToken(args)
}

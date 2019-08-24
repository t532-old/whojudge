import { prisma, String } from '../../prisma-client'

interface DeleteTokenInput {
    token: String
}

export async function deleteToken(_, args: DeleteTokenInput) {
    return prisma.deleteToken(args)
}

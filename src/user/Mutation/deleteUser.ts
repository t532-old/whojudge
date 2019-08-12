import { prisma, ID_Input } from '../../prisma-client'

interface DeleteUserInput {
    id: ID_Input
}

export async function deleteUser(_, args: DeleteUserInput) {
    return prisma.deleteUser(args)
}

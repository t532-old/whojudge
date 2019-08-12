import { prisma, ID_Input, Boolean } from '../../prisma-client'

interface SetUserAdminInput {
    id: ID_Input
    isAdmin: Boolean
}

export async function setUserAdmin(_, args: SetUserAdminInput) {
    return prisma.updateUser({
        where: { id: args.id },
        data: { isAdmin: args.isAdmin },
    })
}

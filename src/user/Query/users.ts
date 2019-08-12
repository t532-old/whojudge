import { prisma, UserWhereInput, UserOrderByInput, Int } from '../../prisma-client'

interface UsersInput {
    where?: UserWhereInput
    orderBy?: UserOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export function users(_, args: UsersInput) {
    return prisma.users(args)
}

import { rootToken } from '../..'
import { ID_Input, prisma } from '../../prisma-client'
import { ApolloError } from 'apollo-server-koa'
import { hash } from 'bcrypt'

interface CreateRootUserInput {
    token: ID_Input
    pass: String
}

export async function createRootUser(_, { token, pass }: CreateRootUserInput) {
    if (token !== rootToken)
        throw new ApolloError('Wrong root token', 'WHOJ_WRONG_RTKN')
    return prisma.createUser({
        username: 'root',
        passwordHash: await hash(pass, 3),
        introduction: 'Root user',
        isAdmin: true,
        lastSubmitAt: new Date(),
    })
}

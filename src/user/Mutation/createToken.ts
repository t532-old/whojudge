import { prisma, String } from '../../prisma-client'
import { compare } from 'bcrypt'
import { ApolloError } from 'apollo-server-koa'

interface CreateTokenInput {
    username: String
    pass: String
}

export async function createToken(_, args: CreateTokenInput) {
    const user = await prisma.user({ username: args.username })
    if (user !== null && await compare(args.pass, user.passwordHash)) {
        return prisma.createToken({
            user: { connect: { id: user.id } },
        })
    } else
        throw new ApolloError('Wrong Username / Password', 'WHOJ_USER_NEXIST')
}

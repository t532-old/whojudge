import { prisma, String } from '../../prisma-client'
import { compare } from 'bcrypt'

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
    }
}

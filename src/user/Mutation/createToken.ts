import { prisma, ID_Input, String } from '../../prisma-client'
import nanoid from 'nanoid'
import { compare } from 'bcrypt'

interface CreateTokenInput {
    id: ID_Input
    pass: String
}

export async function createToken(_, args: CreateTokenInput) {
    const user = await prisma.user({ id: args.id })
    if (user !== null && await compare(args.pass, user.passwordHash)) {
        return prisma.createToken({
            id: nanoid(),
            user: { connect: { id: user.id } },
        })
    }
}

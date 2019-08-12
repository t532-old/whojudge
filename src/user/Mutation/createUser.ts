import { prisma, String } from '../../prisma-client'
import { hash } from 'bcrypt'

interface CreateUserInput {
    username: String
    pass: String
}

export async function createUser(_, args: CreateUserInput) {
    // CAPTCHA?
    return prisma.createUser({
        username: args.username,
        passwordHash: await hash(args.pass, 3),
        introduction: 'Hi!',
        isAdmin: false,
        lastSubmitAt: new Date(),
    })
}

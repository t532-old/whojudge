import { prisma, String } from '../../prisma-client'
import { WhojudgeContext } from '../..'

interface UpdateUserInput {
    username: String
    introduction: String
}

export async function updateUser(_, args: UpdateUserInput, ctx: WhojudgeContext) {
    prisma.updateUser({
        where: await ctx.user,
        data: args,
    })
}

import { prisma, String } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface UpdateUserInput {
    username: String
    introduction: String
}

export async function updateUser(_, args: UpdateUserInput, ctx: WhojudgeContext) {
    return prisma.updateUser({
        where: await ctx.user,
        data: args,
    })
}

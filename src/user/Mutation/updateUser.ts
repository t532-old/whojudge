import { prisma, String } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface UpdateUserInput {
    data: {
        username: String
        introduction: String
    }
}

export async function updateUser(_, args: UpdateUserInput, ctx: WhojudgeContext) {
    return prisma.updateUser({
        where: { id: ctx.user.id },
        data: args.data,
    })
}

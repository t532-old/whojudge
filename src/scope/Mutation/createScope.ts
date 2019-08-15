import { prisma } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

export async function createScope(_1, _2, ctx: WhojudgeContext) {
    return prisma.createScope({
        creator: { connect: await ctx.user },
        title: 'New Scope',
        isSorted: false,
        isLinear: false,
        isContest: false,
        description: '',
        visible: false,
    })
}

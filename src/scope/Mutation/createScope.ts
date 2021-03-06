import { prisma } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

export async function createScope(_1, _2, ctx: WhojudgeContext) {
    return prisma.createScope({
        creator: { connect: { id: ctx.user.id } },
        title: 'New Scope',
        isLinear: false,
        isContest: false,
        description: '',
        visible: false,
    })
}

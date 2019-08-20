import { prisma, ID_Input } from '../../prisma-client'
import { WhojudgeContext } from '../../context'
import { ApolloError } from 'apollo-server-koa'

interface SkipParticipantStepInput {
    id: ID_Input
}

export async function skipParticipantStep(_, args: SkipParticipantStepInput, ctx: WhojudgeContext) {
    if (typeof ctx.participant.step !== 'number')
        throw new ApolloError('Not linear scope', 'WHOJ_SCOPE_NLINEAR')
    const scope = await ctx.participant_s().scope()
    const skip = Number(ctx.participant.skippedStep + 1 <= scope.skippable)
    return prisma.updateParticipant({
        where: args,
        data: {
            skippedStep: ctx.participant.skippedStep + skip,
            step: ctx.participant.step + skip,
        }
    })
}

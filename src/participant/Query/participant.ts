import { WhojudgeContext } from '../../context'
import { prisma, ID_Input } from '../../prisma-client'
import * as ruleset from '../../config/rules'

interface QueryParticipantInput {
    user: ID_Input
    scope: ID_Input
}

export async function participant(_1, args: QueryParticipantInput, ctx: WhojudgeContext) {
    const part = (await prisma.participants({
        where: {
            user: { id: args.user },
            scope: { id: args.scope },
        }
    }))[0]
    if (!part) return null
    if (ctx.scope.isContest &&
        ruleset[ctx.scope.contestMode].mask(
            ctx.scope.from ? new Date(ctx.scope.from) : undefined,
            ctx.scope.to ? new Date(ctx.scope.to) : undefined,
        )
    ) {
        part.score = null
    }
    return part
}

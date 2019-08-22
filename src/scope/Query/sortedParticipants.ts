import { WhojudgeContext } from '../../context'
import * as ruleset from '../../config/rules'

export async function sortedParticipants(_1, _2, ctx: WhojudgeContext) {
    if (ctx.scope.isContest) {
        const results = await ctx.scope_s().participants()
        const sorted = results.sort(ruleset[ctx.scope.contestMode].sort)
        if (!ruleset[ctx.scope.contestMode].mask(
            ctx.scope.from ? new Date(ctx.scope.from) : undefined,
            ctx.scope.to ? new Date(ctx.scope.to) : undefined,
        ))
            return sorted
        else
            return sorted.map(i => {
                i.score = null
                return i
            })
    } else return null
}

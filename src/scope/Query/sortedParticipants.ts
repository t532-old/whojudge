import { WhojudgeContext } from '../../context'
import * as ruleset from '../../config/rules'

export async function sortedParticipants(_1, _2, ctx: WhojudgeContext) {
    if (ctx.scope.isContest) {
        const results = await ctx.scope_s().participants()
        return results.sort(ruleset[ctx.scope.contestMode].sort)
    } else return null
}

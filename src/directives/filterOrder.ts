import { makeDirective } from './construct'

export const filterOrder = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            const result = await resolver(parent, args, ctx, info)
            if (ctx.user.isAdmin) return result
            if (ctx.participant.step) {
                if (result instanceof Array)
                    return result.filter(i => ctx.participant.step >= i.order)
                else if (ctx.participant.step < result.order)
                    return null
            }
        }
    }
)

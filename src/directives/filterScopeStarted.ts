import { makeDirective } from './construct'

export const filterScopeStarted = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            const result = await resolver(parent, args, ctx, info)
            if (!ctx.scope) return result instanceof Array ? [] : null
            if (!ctx.user.isAdmin && ctx.scope.from) {
                if (new Date(ctx.scope.from) > new Date())
                    return result
                return result instanceof Array ? [] : null
            }
            return result
        }
    }
)

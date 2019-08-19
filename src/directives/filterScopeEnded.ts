import { makeDirective } from './construct'

export const filterScopeEnded = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            const result = resolver(parent, args, ctx, info)
            if (!ctx.scope) return result instanceof Array ? [] : null
            if (!ctx.user.isAdmin && ctx.scope.to) {
                if (new Date(ctx.scope.to) < new Date())
                    return result
                return result instanceof Array ? [] : null
            }
            return result
        }
    }
)

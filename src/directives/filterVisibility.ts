import { makeDirective } from './construct'

export const filterVisibility = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            const result = await resolver(parent, args, ctx, info)
            if (!ctx.user.isAdmin) {
                if (result instanceof Array) {
                    return result.filter(i => i.visible)
                } else {
                    if (result.visible) return result
                    else return null
                }
            } else return result
        }
    }
)

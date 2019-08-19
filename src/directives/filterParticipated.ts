import { makeDirective } from './construct'
import { prisma } from '../prisma-client'

export const filterParticipated = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            const result = await resolver(parent, args, ctx, info)
            if (!ctx.user.isAdmin) {
                if (await prisma.$exists.participant({
                    user: { id: ctx.user.id },
                    scope: { id: ctx.scope.id },
                })) return result
                else return result instanceof Array ? [] : null
            } else return result
        }
    }
)

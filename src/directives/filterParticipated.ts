import { makeDirective } from './construct'
import { prisma } from '../prisma-client'

export const filterParticipated = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            const result = await resolver(parent, args, ctx, info)
            try {
                ctx.participant = (await prisma.participants({
                    where: {
                        user: { id: ctx.user.id },
                        scope: { id: ctx.scope.id },
                    }
                }))[0]
                ctx.participant_s = () => prisma.participant({ id: ctx.participant.id })
            } catch { ctx.participant = null }
            if (!ctx.user.isAdmin) {
                if (ctx.participant) return result
                else return result instanceof Array ? [] : null
            } else return result
        }
    }
)

import { makeDirective } from './construct'
import { prisma } from '../prisma-client'
import { ApolloError } from 'apollo-server-koa'

export const ifParticipated = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            try {
                ctx.participant = (await prisma.participants({
                    where: {
                        user: { id: ctx.user.id },
                        scope: { id: ctx.scope.id },
                    }
                }))[0]
                ctx.participant_s = prisma.participant({ id: ctx.participant.id })
            } catch { ctx.participant = null }
            if (!ctx.user.isAdmin) {
                if (ctx.participant) return resolver(parent, args, ctx, info)
                else
                    throw new ApolloError('Not participated', 'WHOJ_NPART')
            } else return resolver(parent, args, ctx, info)
        }
    }
)

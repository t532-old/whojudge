import { makeDirective } from './construct'
import { prisma } from '../prisma-client'
import { ApolloError } from 'apollo-server-koa'

export const ifParticipated = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            if (!ctx.user.isAdmin) {
                if (await prisma.$exists.participant({
                    user: { id: ctx.user.id },
                    scope: { id: ctx.scope.id },
                })) return resolver(parent, args, ctx, info)
                else
                    throw new ApolloError('Not participated', 'WHOJ_NPART')
            } else return resolver(parent, args, ctx, info)
        }
    }
)

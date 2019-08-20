import { makeDirective } from './construct'
import { ApolloError } from 'apollo-server-koa'

export const ifOrder = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            if (ctx.user.isAdmin) return resolver(parent, args, ctx, info)
            if (ctx.participant.step && ctx.participant.step < ctx.problem.order)
                throw new ApolloError('Gone too far', 'WHOJ_NORDER')
            return resolver(parent, args, ctx, info)
        }
    }
)

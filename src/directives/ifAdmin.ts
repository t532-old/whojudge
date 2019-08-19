import { makeDirective } from './construct'
import { ApolloError } from 'apollo-server-koa'

export const ifAdmin = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            if (!ctx.user.isAdmin)
                throw new ApolloError('Not Admin', 'WHOJ_NADMIN')
            return resolver(parent, args, ctx, info)
        }
    }
)

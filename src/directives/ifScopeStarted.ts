import { makeDirective } from './construct'
import { ApolloError } from 'apollo-server-koa'

export const ifScopeStarted = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            if (ctx.scope.from && new Date(ctx.scope.from) > new Date())
                throw new ApolloError('Scope not started', 'WHOJ_SCOPE_NBEG')
            return resolver(parent, args, ctx, info)
        }
    }
)

import { makeDirective } from './construct'
import { ApolloError } from 'apollo-server-koa'

export const ifScopeEnded = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            if (ctx.scope.to && new Date(ctx.scope.to) > new Date())
                throw new ApolloError('Scope hasn\'t ended', 'WHOJ_SCOPE_NEND')
            return resolver(parent, args, ctx, info)
        }
    }
)

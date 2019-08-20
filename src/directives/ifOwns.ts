import { makeDirective } from './construct'
import { ApolloError } from 'apollo-server-koa'

export const ifOwns = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            if (ctx.user.id !== await ctx.topic_s().user().id())
                throw new ApolloError('Not owner', 'WHOJ_NOWNER')
            return resolver(parent, args, ctx, info)
        }
    }
)

import { makeDirective } from './construct'
import { prisma } from '../prisma-client'
import { ApolloError } from 'apollo-server-koa'

export const ifAuth = makeDirective(
    function (resolver) {
        return async function (parent, args, ctx, info) {
            try {
                ctx.user_s = prisma.token({ id: ctx.token }).user()
                ctx.user = await ctx.user_s
            } catch { ctx.user = null }
            if (ctx.user === null)
                throw new ApolloError('Not Authorized', 'WHOJ_NAUTH')
            return resolver(parent, args, ctx, info)
        }
    }
)

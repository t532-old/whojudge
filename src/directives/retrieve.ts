import { makeDirective } from './construct'
import { prisma } from '../prisma-client'

export const retrieve = makeDirective(
    function (resolver, { collection }: { collection: string }) {
        return async function (parent, args, ctx, info) {
            try {
                ctx.topic_s = prisma[collection]({ id: args.id })
                ctx[`${collection}_s`] = ctx.topic_s
                ctx.topic = await ctx.topic_s
                ctx[collection] = ctx.topic
            } catch { ctx[collection] = ctx.topic = null }
            if (ctx.topic === null) return null
            return resolver(parent, args, ctx, info)
        }
    }
)

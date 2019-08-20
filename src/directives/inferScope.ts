import { makeDirective } from './construct'
import { prisma } from '../prisma-client'

export const inferScope = makeDirective(
    function (resolver, { array }: { array: boolean }) {
        return async function (parent, args, ctx, info) {
            try {
                if (ctx.participant)
                    ctx.scope_s = () => ctx.participant_s().scope()
                else if (ctx.problem)
                    ctx.scope_s = () => ctx.problem_s().scope()
                else if (ctx.topic)
                    ctx.scope_s = () => ctx.topic_s().scope()
                else
                    ctx.scope_s = () => prisma.scope({ id: args.scope })
                ctx.scope = await ctx.scope_s()
            } catch (e) { ctx.scope = null }
            if (ctx.scope === null) return array ? [] : null
            return resolver(parent, args, ctx, info)
        }
    }
)

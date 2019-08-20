import { makeDirective } from './construct'
import { prisma } from '../prisma-client'

export const inferProblem = makeDirective(
    function (resolver, { array }: { array: boolean }) {
        return async function (parent, args, ctx, info) {
            try {
                if (ctx.submission)
                    ctx.problem_s = () => ctx.submission_s().problem()
                else if (ctx.topic)
                    ctx.problem_s = () => ctx.topic_s().problem()
                else
                    ctx.problem_s = () => prisma.problem({ id: args.problem })
                ctx.problem = await ctx.problem_s()
            } catch { ctx.problem = null }
            if (ctx.problem === null) return array ? [] : null
            return resolver(parent, args, ctx, info)
        }
    }
)
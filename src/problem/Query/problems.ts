import { prisma, ProblemWhereInput, ProblemOrderByInput, Int, ID_Input } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface ProblemsInput {
    scope: ID_Input
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export async function problems(_, args: ProblemsInput, ctx: WhojudgeContext) {
    return ctx.scope_s().problems({
        where: args.where,
        orderBy: args.orderBy,
        skip: args.skip,
        first: args.first,
        last: args.last,
    })
}

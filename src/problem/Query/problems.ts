import { prisma, ProblemWhereInput, ProblemOrderByInput, Int } from '../../prisma-client'
import { WhojudgeContext } from '../../context';

interface ProblemsInput {
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export async function problems(_, args: ProblemsInput, ctx: WhojudgeContext) {
    const result = await prisma.problems(args)
    if (ctx.user.isAdmin)
        { return result }
    else { return result.filter(i => i.visible) }
}

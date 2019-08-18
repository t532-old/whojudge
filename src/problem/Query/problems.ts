import { prisma, ProblemWhereInput, ProblemOrderByInput, Int, ScopePromise } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface ProblemsInput {
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export async function problems(_, args: ProblemsInput, ctx: WhojudgeContext) {
    const problems = await prisma.problems(args)
    const problemsScopes = (await Promise.all(
        problems.map(i => 
            prisma
            .problem({ id: i.id })
            .scope<ScopePromise>())
    )).map(i => i.id)
    const participants = await prisma
        .user({ id: ctx.user.id })
        .participants()
    const userScopes = (await Promise.all(
        participants.map(i =>
            prisma
            .participant({ id: i.id })
            .scope<ScopePromise>())
    )).map(i => i.id)
    if (ctx.user.isAdmin)
        { return problems }
    else
        { return problems.filter((i, idx) => 
            i.visible && userScopes.includes(problemsScopes[idx])) }
}

import { prisma, ID_Input } from '../../prisma-client'
import { WhojudgeContext } from '../../context';

interface ProblemInput {
    id: ID_Input
}

export async function problem(_, args: ProblemInput, ctx: WhojudgeContext) {
    const result = await prisma.problem(args)
    const isParticipant = await prisma.$exists.participant({
        user: { id: ctx.user.id } })
    if (ctx.user.isAdmin)
        { return result }
    else if (result && isParticipant && result.visible)
        { return result }
    else { return null }
}

import { prisma, ID_Input } from '../../prisma-client'
import { deleteSpecialJudge } from '@whojudge/alice'
import { WhojudgeContext } from '../../context'

interface DeleteProblemInput {
    id: ID_Input
}

export async function deleteProblem(_, args: DeleteProblemInput, ctx: WhojudgeContext) {
    const result = await prisma.deleteProblem(args)
    deleteSpecialJudge(result.id)
    for (let i = result.order + 1; ; i++) {
        const result = await prisma.updateManyProblems({
            where: {
                scope: { id: ctx.scope.id },
                order: i,
            },
            data: { order: i - 1 },
        })
        if (!Number(result.count)) break
    }
    return result
}

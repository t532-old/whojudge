import { prisma, ID_Input } from '../../prisma-client'
import { deleteSpecialJudge } from '@whojudge/alice'

interface DeleteProblemInput {
    id: ID_Input
}

export async function deleteProblem(_, args: DeleteProblemInput) {
    const result = await prisma.deleteProblem(args)
    if (result)
        { deleteSpecialJudge(result.id) }
    return result
}

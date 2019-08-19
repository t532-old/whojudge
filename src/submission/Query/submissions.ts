import { prisma, ID_Input, SubmissionWhereInput, SubmissionOrderByInput, Int } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface SubmissionsInput {
    problem: ID_Input
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export async function submissions(_, args: SubmissionsInput, ctx: WhojudgeContext) {
    return ctx.problem_s.submissions(args)
}

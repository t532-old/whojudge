import { prisma, ID_Input } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface ScopeInput {
    id: ID_Input
}

export async function scope(_, args: ScopeInput, ctx: WhojudgeContext) {
    const result = await prisma.scope(args)
    if (ctx.user.isAdmin)
        { return result }
    else if (!result || result.visible)
        { return result }
    else { return null }
}

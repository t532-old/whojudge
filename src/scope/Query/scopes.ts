import { prisma, ScopeWhereInput, ScopeOrderByInput, Int } from '../../prisma-client'
import { WhojudgeContext } from '../../context'

interface ScopesInput {
    where?: ScopeWhereInput
    orderBy?: ScopeOrderByInput
    skip?: Int
    first?: Int
    last?: Int
}

export async function scopes(_, args: ScopesInput, ctx: WhojudgeContext) {
    const result = await prisma.scopes(args)
    if (ctx.user.isAdmin)
        { return result }
    else { return result.filter(i => i.visible) }
}

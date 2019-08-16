import { User, prisma } from './prisma-client'

export interface WhojudgeContext {
    token: string
    user: User
}

export async function context({ ctx: { request: { header } } }) {
    const token = header['authorization']
    let user: User
    try { user = await prisma.token({ id: token }).user() }
    catch { user = null }
    return { token, user }
}

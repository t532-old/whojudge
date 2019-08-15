import { UserNullablePromise, prisma } from './prisma-client'

export interface WhojudgeContext {
    token: string
    user: UserNullablePromise
}

export function context({ ctx: { request: { header } } }) {
    const token = header['authorization']
    return {
        token,
        user: prisma.token({ id: token }).user()
    }
}

import { TokenNullablePromise } from '../prisma-client'
import { GraphQLResolverFunction } from '..'
import { map, mapfn } from '../util'

export const Token: { [key: string]: GraphQLResolverFunction<TokenNullablePromise> } = {
    id: map('id'),
    user: mapfn('user'),
}

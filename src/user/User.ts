import { UserNullablePromise } from '../prisma-client'
import { GraphQLResolverFunction } from '..'
import { map, mapfn } from '../util'

export const User: { [key: string]: GraphQLResolverFunction<UserNullablePromise> } = {
    id: map('id'),
    username: map('username'),
    introduction: map('introduction'),
    acceptedProblems: mapfn('acceptedProblems'),
    attemptedProblems: mapfn('attemptedProblems'),
    isAdmin: map('isAdmin'),
    scopes: mapfn('scopes'),
    participants: mapfn('participants'),
    submissions: mapfn('submissions'),
    problems: mapfn('problems'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
    lastSubmitAt: map('lastSubmitAt'),
}

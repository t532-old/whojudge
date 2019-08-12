import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { promises as fs } from 'fs'
import { UserNullablePromise } from './prisma-client'

export interface WhojudgeContext {
    token: string
    user: UserNullablePromise
}

export type GraphQLResolverFunction<T = any, A = any, R = any> = (parent: T, args: A, ctx: WhojudgeContext) => R

void async function main() {
    const server = new ApolloServer({
        typeDefs: await Promise.all([
            'general',
            'participant',
            'problem',
            'scope',
            'submission',
            'user',
        ].map(name =>
            fs.readFile(`api/${name}.gql`, 'utf-8'))),
        resolvers: void 0,
    })
}()

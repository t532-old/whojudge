import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { promises as fs } from 'fs'
import resolvers from './resolvers'
import { WhojudgeContext, context } from './context'
import { AuthDirective, AdminDirective } from './util'
import { init } from '@whojudge/alice'
import aliceConfig from './config'

void async function main() {
    const app = new Koa()
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
        resolvers,
        schemaDirectives: {
            auth: AuthDirective,
            admin: AdminDirective,
        },
        context,
        introspection: true,
        playground: true,
    })
    server.applyMiddleware({ app })
    init(aliceConfig)
    app.listen(8080)
}()

export type GraphQLResolverFunction<T = any, A = any, R = any> = (parent: T, args: A, ctx: WhojudgeContext) => R

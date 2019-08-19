import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { promises as fs } from 'fs'
import resolvers from './resolvers'
import { context } from './context'
import * as schemaDirectives from './directives'
import { init } from '@whojudge/alice'
import { aliceConfig } from './config/config'
import nanoid from 'nanoid'

export const rootToken = nanoid()

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
        schemaDirectives,
        context,
        introspection: true,
        playground: true,
    })
    server.applyMiddleware({ app })
    init(aliceConfig)
    console.log(`---
Welcome to Whojudge.
If you haven't created a root user on whojudge yet, send this request to the GraphQL endpoint:

    mutation {
        createRootUser(token: "${rootToken}", pass: $YOUR_ROOT_PASSWORD) {
            username
            id
        }
    }
    
And you'll be able to use 'root' as an initial admin account.`)
    app.listen(8080)
}()

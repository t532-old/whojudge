import { GraphQLResolverFunction } from '.'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLField } from 'graphql'
import { WhojudgeContext } from './context'
import { prisma, ID_Input, User } from './prisma-client'
import { ApolloError } from 'apollo-server-koa'

export function map<T>(key: string): GraphQLResolverFunction<T>
    { return function(parent) { return parent[key] } }

export function maplnk<T extends { id: ID_Input }>(key: string, collection: string): GraphQLResolverFunction<T>
    { return function(parent, args: any) { return prisma[collection]({ id: parent.id })[key](args) } }

export class AuthDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve } = field
        async function newResolve(_1, _2, ctx: WhojudgeContext, _4) {
            if (ctx.user === null)
                { throw new ApolloError('No Authorization', 'WHOJ_NAUTH') }
            return resolve(_1, _2, ctx, _4)
        }
        field.resolve = newResolve
    }
}

export class AdminDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve } = field
        async function newResolve(_1, _2, ctx: WhojudgeContext, _4) {
            if (!ctx.user || ctx.user.isAdmin === false)
                { throw new ApolloError('Not Admin', 'WHOJ_NADMIN') }
            return resolve(_1, _2, ctx, _4)
        }
        field.resolve = newResolve
    }
}

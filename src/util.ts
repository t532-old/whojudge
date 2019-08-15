import { GraphQLResolverFunction } from '.'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLField } from 'graphql'
import { WhojudgeContext } from './context'
import { prisma, ID_Input } from './prisma-client'

export function map<T>(key: string): GraphQLResolverFunction<T>
    { return function(parent) { return parent[key] } }

export function maplnk<T extends { id: ID_Input }>(key: string, collection: string): GraphQLResolverFunction<T>
    { return function(parent, args: any) { return prisma[collection]({ id: parent.id })[key](args) } }

export class AuthDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve } = field
        async function newResolve(_1, _2, ctx: WhojudgeContext, _4) {
            if (await ctx.user === null)
                { throw new Error('No Authorization') }
            return resolve(_1, _2, ctx, _4)
        }
        field.resolve = newResolve
    }
}

export class AdminDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve } = field
        async function newResolve(_1, _2, ctx: WhojudgeContext, _4) {
            if (await ctx.user.isAdmin() === false)
                { throw new Error('Not Admin') }
            return resolve(_1, _2, ctx, _4)
        }
        field.resolve = newResolve
    }
}

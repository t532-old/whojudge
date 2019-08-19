import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLField, GraphQLFieldResolver } from 'graphql'
import { WhojudgeContext } from '../context'

export function makeDirective<T = any, Tp = any>(fn: (
    resolver: GraphQLFieldResolver<any, WhojudgeContext<T, Tp>>,
    args: Record<string, any>
) => GraphQLFieldResolver<any, WhojudgeContext<T, Tp>>): any {
    return class extends SchemaDirectiveVisitor {
        public visitFieldDefinition(field: GraphQLField<any, WhojudgeContext<T, Tp>>) {
            const { resolve } = field
            field.resolve = fn(resolve, this.args)
        }
    }
}

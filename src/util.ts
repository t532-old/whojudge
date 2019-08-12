import { GraphQLResolverFunction } from '.'

export function map<T>(key: string): GraphQLResolverFunction<T>
    { return function(parent) { return parent[key] } }

export function mapfn<T>(key: string): GraphQLResolverFunction<T>
    { return function(parent, args: any) { return parent[key](args) } }

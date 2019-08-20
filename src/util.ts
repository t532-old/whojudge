import { GraphQLFieldResolver } from 'graphql'
import { prisma, ID_Input } from './prisma-client'

export function map<T>(key: string): GraphQLFieldResolver<T, any>
    { return function(parent) { return typeof parent[key] === 'function' ? parent[key]() : parent[key] } }

export function maplnk<T extends { id: ID_Input }>(key: string, collection: string): GraphQLFieldResolver<T, any>
    { return function(parent, args: any) { return prisma[collection]({ id: parent.id })[key](args) } }

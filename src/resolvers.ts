import DateTime from 'graphql-type-datetime'
import * as user from './user'
import * as scope from './scope'
import * as problem from './problem'
import * as participant from './participant'
import * as submission from './submission'

export default [
    { DateTime },
    user,
    scope,
    problem,
    participant,
    submission
]

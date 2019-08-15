import { map, maplnk } from '../util'

const lnk = _ => maplnk(_, 'user')

export const User = {
    id: map('id'),
    username: map('username'),
    introduction: map('introduction'),
    acceptedProblems: lnk('acceptedProblems'),
    attemptedProblems: lnk('attemptedProblems'),
    isAdmin: map('isAdmin'),
    scopes: lnk('scopes'),
    participants: lnk('participants'),
    submissions: lnk('submissions'),
    problems: lnk('problems'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
    lastSubmitAt: map('lastSubmitAt'),
}

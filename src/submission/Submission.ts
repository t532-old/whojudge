import { maplnk, map } from '../util'

const lnk = _ => maplnk(_, 'submission')

export const Submission = {
    id: map('id'),
    user: lnk('user'),
    problem: lnk('problem'),
    code: map('code'),
    language: map('language'),
    status: map('status'),
    detail: map('detail'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
}

import { map, maplnk } from '../util'
const lnk = _ => maplnk(_, 'participant')

export const Participant = {
    id: map('id'),
    scope: lnk('scope'),
    user: lnk('user'),
    step: map('step'),
    skippedStep: map('skippedStep'),
    score: map('score'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
}

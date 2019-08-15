import { map, maplnk } from '../util'

const lnk = _ => maplnk(_, 'scope')

export const Scope = {
    id: map('id'),
    creator: lnk('creator'),
    title: map('title'),
    problems: lnk('problems'),
    isSorted: map('isSorted'),
    participants: lnk('participants'),
    isLinear: map('isLinear'),
    skippable: map('skippable'),
    isContest: map('isContest'),
    description: map('description'),
    visible: map('visible'),
    from: map('from'),
    to: map('to'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
}

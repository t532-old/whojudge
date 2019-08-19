import { map, maplnk } from '../util'

const lnk = _ => maplnk(_, 'user')

export const User = {
    id: map('id'),
    username: map('username'),
    introduction: map('introduction'),
    isAdmin: map('isAdmin'),
    participants: lnk('participants'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
    lastSubmitAt: map('lastSubmitAt'),
}

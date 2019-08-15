import { map, maplnk } from '../util'

export const Token = {
    id: map('id'),
    user: maplnk('user', 'token'),
}

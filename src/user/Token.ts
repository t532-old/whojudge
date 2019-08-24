import { map, maplnk } from '../util'

export const Token = {
    id: map('id'),
    token: map('token'),
    user: maplnk('user', 'token'),
}

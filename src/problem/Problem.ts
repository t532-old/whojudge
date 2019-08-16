import { maplnk, map } from '../util'

const lnk = _ => maplnk(_, 'problem')

export const Problem = {
    id: map('id'),
    scope: lnk('scope'),
    creator: lnk('creator'),
    title: map('title'),
    story: map('story'),
    background: map('background'),
    description: map('description'),
    inputFormat: map('inputFormat'),
    outputFormat: map('outputFormat'),
    tips: map('tips'),
    stdAnswer: map('stdAnswer'),
    examples: map('examples'),
    testcases: map('testcases'),
    spj: map('spj'),
    tags: map('tags'),
    visible: map('visible'),
    nAccepted: map('nAccepted'),
    nAttempted: map('nAttempted'),
    submissions: lnk('submissions'),
    createdAt: map('createdAt'),
    updatedAt: map('updatedAt'),
    order: map('order'),
}

import { User, prisma, UserNullablePromise, Scope, ScopeNullablePromise, Problem, ProblemNullablePromise, Participant, ParticipantNullablePromise, Submission, SubmissionNullablePromise } from './prisma-client'

export interface WhojudgeContext<T = void, Tp = void> {
    token: string
    user?: User
    user_s?(): UserNullablePromise
    scope?: Scope
    scope_s?(): ScopeNullablePromise
    problem?: Problem
    problem_s?(): ProblemNullablePromise
    participant?: Participant
    participant_s?(): ParticipantNullablePromise
    submission?: Submission
    submission_s?(): SubmissionNullablePromise
    topic?: T
    topic_s?(): Tp
}

export async function context({ ctx: { request: { header } } }) {
    return { token: header['authorization'] }
}

import { WhojudgeContext } from '../../context'
import { SubmissionPromise } from '../../prisma-client'

// Standard OI Contest Mode

// The Scoring Object.
// The structure is not necessary;
// This is just an example.
interface Score {
    score: number
    time: number
}

// Always hide the leaderboard
export function mask(time: number, total: number): boolean {
    return true
}

export function init(): Score {
    return {
        score: 0,
        time: Infinity,
    }
}

// Update score if not compile error
export async function update(
    last: Score,
    submission: () => SubmissionPromise,
    context: WhojudgeContext,
): Promise<void> {
    if (await submission().status() !== 'ERROR') {
        const detail = await submission().detail()
        last.score = detail.reduce((a, i) => a + i.point, 0)
        last.time = detail.reduce((a, i) => a + i.time, 0)
    }
}

// Compare by total score;
// If two total scores are the same, compare by run times of the first problem.
export function sort(a: Score[], b: Score[]): number {
    return (
        b.reduce((a, i) => a + i.score, 0) - a.reduce((a, i) => a + i.score, 0) ||
        a[0].time - b[0].time
    )
}

# whojudge
Yet Another Online Judge System.

**EN** | [ZH](blob/master/README-zh.md)

## Features
- WIP
- Lightweight
- Modern GraphQL API
- Customizable Contest Rules
- Runner based on lrun (the one luogu uses)
- Node.js & TypeScript
- Basically Safe (?)
- Well, no built-in community system...

## Dependencies
- Dependencies of [Alice](https://github.com/sfls/alice)
- Node.js with ES2017 Support (Better if > v12)
- NPM (included in Node)
- Docker
- Docker compose

## Build & Run
- Specify a **Prisma Management API Secret** in `docker-compose.yml`, replace `__YOUR_SECRET_HERE__`.
- Specify **Database Root Username & Password** in `docker-compose.yml`, replace `__YOUR_DB_USERNAME/PASSWORD__`.
- Specify a **Prisma API Secret** in `prisma.yml`, replace `__YOUR_SECRET_HERE__`.
- Run the following script:
    ```sh
    npm install
    docker-compose up -d
    sudo PRISMA_MANAGEMENT_API_SECRET=__YOUR_SECRET_HERE__ npm start
    # sudo is necessary since alice needs it.
    ```

## Config
- `src/config/config.ts`: Refer to [alice](https://github.com/sfls/alice).
- `src/rules/`: See [Editing Rules](#editing-rules)

## Editing Rules
Here's a boilerplate:
```ts
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
```

Basically:
- `init()` returns an initial scoring object;
- `update()` is called every time a submission is judged;
- `sort()` is used with `Array.prototype.sort()` to sort participants and generate the leaderboard;
- `mask()` determines whether to show the leaderboard or not.

## I've Found a Bug...
Any contribution is welcome! You can:
- File an issue;
- Open a pull request;

Whether you have found one or not, you can always:
- Give a star!

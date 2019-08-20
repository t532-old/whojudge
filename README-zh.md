# whojudge
Yet Another Online Judge System.

**ZH** | [EN](blob/master/README.md)

## 介绍
- WIP
- 轻量级
- 现代 GraphQL API
- 可自定义的比赛规则
- 基于 lrun 的评测机（洛谷用的）
- Node.js & TypeScript
- 基本安全（？
- 没有内置社区系统...

## 依赖项
- [Alice](https://github.com/sfls/alice) 的依赖项
- 支持 ES2017 的 Node.js
- NPM
- Docker
- Docker compose

## 构建运行
- 在 `docker-compose.yml` 里面指定 **Prisma Management API Secret**（覆盖掉 `__YOUR_SECRET_HERE__`）。
- 在 `docker-compose.yml` 里指定 **Database Root Username & Password**（覆盖掉`__YOUR_DB_USERNAME/PASSWORD__`）。
- 在 `prisma.yml` 里指定 **Prisma API Secret**（覆盖掉 `__YOUR_SECRET_HERE__`）。
- 执行脚本：
    ```sh
    npm install
    docker-compose up -d
    sudo PRISMA_MANAGEMENT_API_SECRET=__YOUR_SECRET_HERE__ npm start
    # 必须带 sudo 执行，alice 需要 sudo。
    ```

## 配置
- `src/config/config.ts`: 参考 [alice](https://github.com/sfls/alice).
- `src/rules/`: 参考[编辑规则](#编辑规则)

## 编辑规则
参考这个模板：
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

- `init()` 返回初始计分对象；
- `update()` 在每次提交时运行；
- `sort()` 会在计算排行时被传入 `Array.prototype.sort()`；
- `mask()` 决定是否显示计分板。

## 我找到了个 Bug...
欢迎任何形式的协作开发！你可以：
- 提交一个 Issue；
- 提交一个 Pull Request；

或者，无论有没有 Bug，你都可以
- 点一颗 Star！

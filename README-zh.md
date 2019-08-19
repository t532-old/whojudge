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
// OI 模式

// 计分对象；
// 这个结构可以改变。
interface Score {
    score: number
    time: number
}

// 比赛时总是隐藏分数
export function mask(time: number, total: number): boolean {
    return true
}

export function init(): Score {
    return {
        score: 0,
        time: Infinity,
    }
}

// 啥都不干
export function begin(time: number): void {}

// 啥都不干
export function end(): void {}

// 如果没有 CE，就更新分数
export function update(
    last: Score,
    submission: Submission,
    scores: Score[],
): void {
    if (submission.status !== 'ERROR') {
        last.score = submission.score
        last.time = submission.detail.reduce((a, i) => a + i.time)
    }
}

// 比较总分；如果相同则比较 T1 的运行时间。
export function sort(a: Score[], b: Score[]): number {
    return
        b.reduce((a, i) => a + i) - a.reduce((a, i) => a + i) ||
        a[0].time - b[0].time
}
```

- `init()` 返回初始计分对象；
- `begin()` 在比赛开始时运行；
- `end()` 在比赛结束时运行；
- `update()` 在每次提交时运行；
- `sort()` 会在计算排行时被传入 `Array.prototype.sort()`；
- `mask()` 决定是否显示计分板。

## 我找到了个 Bug...
欢迎任何形式的协作开发！你可以：
- 提交一个 Issue；
- 提交一个 Pull Request；

或者，无论有没有 Bug，你都可以
- 点一颗 Star！

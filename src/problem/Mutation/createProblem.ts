import { prisma, ID_Input } from '../../prisma-client'
import { WhojudgeContext } from '../../context'
import { updateSpecialJudge } from '@whojudge/alice'
import { createReadStream } from 'streamifier'

interface CreateProblemInput {
    scope: ID_Input
}

const DEFAULT_SPECIALJUDGE = `#include "testlib.h"
using namespace std;

int main(int argc, char *argv[]) {
    setName("token-by-token comparing, ignoring trailing space and endl");
    registerTestlibCmd(argc, argv);

    while (!ans.seekEof() && !ouf.seekEof()) {
        string ja = ans.readToken();
        string pa = ouf.readToken();
        if (ja != pa) quitf(_wa, "wrong answer");
    }

    bool ansEnded = ans.seekEof(),
         oufEnded = ouf.seekEof();

    if (ansEnded && oufEnded)
        quitf(_ok, "accepted");
    else if (ansEnded)
        quitf(_fail, "answer too short");
    else if (oufEnded)
        quitf(_fail, "answer too long");
    
    return 0;
}
`

export async function createProblem(_1, args: CreateProblemInput, ctx: WhojudgeContext) {
    const problemCount = await prisma
        .problemsConnection({ where: { scope: { id: args.scope } } })
        .aggregate()
        .count()
    const result = await prisma.createProblem({
        creator: { connect: { id: ctx.user.id } },
        scope: { connect: { id: args.scope } },
        title: 'New Problem',
        story: '',
        background: '',
        description: '',
        inputFormat: '',
        outputFormat: '',
        tips: '',
        stdAnswer: '',
        examples: { create: [] },
        testcases: { create: [] },
        spj: DEFAULT_SPECIALJUDGE,
        tags: { set: [] },
        visible: false,
        nAccepted: 0,
        nAttempted: 0,
        order: problemCount,
    })
    updateSpecialJudge(result.id, createReadStream(DEFAULT_SPECIALJUDGE))
    return result
}

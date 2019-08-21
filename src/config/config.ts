export const submitRate = 30 * 1000

export const aliceConfig = {
    cachePath: './cache',
    infilePath: './upload/infile',
    outfilePath: './upload/outfile',
    language: {
        cpp: {
            compiler: 'g++ -Wall -Wextra -std=c++98 {infile} -o {outfile}'.split(' '),
            runner: '{outfile}'.split(' '),
            extension: '.cpp',
            mirror: [],
        },
        cpp11: {
            compiler: 'g++ -Wall -Wextra -std=c++11 {infile} -o {outfile}'.split(' '),
            runner: '{outfile}'.split(' '),
            extension: '.cpp',
            mirror: [],
        },
        python3: {
            compiler: null,
            runner: '/usr/bin/python3.6 {infile}'.split(' '),
            extension: '.py',
            mirror: ['/usr/bin/python3.6'],
        },
    },
    lrun: {
        uid: 1001,
        gid: 1001,
        compilerTime: 20 * 1000,
        compilerMemory: 512 * 1024 * 1024,
    },
    mirror: ['/lib/', '/lib64/', '/usr/lib/'],
    concurrent: 4,
}

import { prisma, ID_Input } from '../../prisma-client'

interface ParticipantInput {
    id: ID_Input
}

export async function participant(_, args: ParticipantInput) {
    return prisma.participant(args)
}

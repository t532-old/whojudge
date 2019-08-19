import { prisma, ID_Input } from '../../prisma-client'

interface DeleteParticipantInput {
    id: ID_Input
}

export async function deleteParticipant(_, args: DeleteParticipantInput) {
    return prisma.deleteParticipant(args)
}

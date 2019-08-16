import { ID_Input, Int } from '../../prisma-client'
import { FileUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'

interface UploadTestcaseFileInput {
    id: ID_Input
    idx: Int
    file: FileUpload
    type: 'IN' | 'OUT'
}

export async function uploadTestcaseFile(_, { id, idx, file, type }: UploadTestcaseFileInput) {
    const write = createWriteStream(`upload/${type.toLowerCase()}file/${id}-${idx}.${type.toLowerCase()}`)
    const read = file.createReadStream()
    read.pipe(write)
    return new Promise(resolve => read.on('end', () => resolve(true)))
}

import { STORAGE_PATH } from '@/config/storage'
import { File } from '@/types/socket'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function storeFile(file: File) {
  console.log('file', file);
  const extension = file.name.slice(
    ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
  )
  const src = `${uuidv4()}${extension ? '.' + extension : ''}`
  const p = path.resolve(
    STORAGE_PATH,
    src
  )
  await writeFile(p, file.buffer)
  return {
    src,
    name: file.name
  }
}


export async function handleMessageFiles(files: File[]) {
    const result = []
    for (const f of files) {
        result.push(await storeFile(f))
    }
    return result
}
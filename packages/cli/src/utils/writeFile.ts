import { readFile, writeFile } from 'fs-extra'

import { runAI } from '@tianniu-cli/ai'

import { GenType } from '../types/gen'

export async function writeFileStream(filePath: string, writeFilePath: string, options: GenType) {
  // 读取文件内容
  const content = await readFile(filePath, 'utf-8')
  // 调用AI模型
  const stream = await runAI(content, options)
  for await (const part of stream) {
    const delta = part.choices[0]?.delta.content
    if (delta) {
      await writeFile(writeFilePath, delta, { flag: 'a' })
    }
  }
}

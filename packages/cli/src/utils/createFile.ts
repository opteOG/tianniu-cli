import { program } from 'commander'
import { mkdir, pathExists, writeFile } from 'fs-extra'
import { join } from 'path'
import pc from 'picocolors'
import prompts from 'prompts'

import { GenType } from '../types/gen'

export async function createFile(fileName: string, options: GenType): Promise<string> {
  // 提示用户选择要写入的文件路径
  const { writePath } = await prompts({
    type: 'text',
    name: 'writePath',
    message: '请选择要写入的文件夹'
  })
  // 检查写入路径是否存在
  const writeExists = await pathExists(writePath)
  if (!writeExists) {
    try {
      await mkdir(writePath)
    } catch (error) {
      program.error(`${pc.bgRed(`创建文件夹${writePath}失败，请检查${error}`)}`)
    }
  }
  // 创建写入文件路径
  const writeFilePath = join(writePath, `${fileName.split('.')[0]}.${options === 'summarize' ? 'md' : 'test.js'}`)
  // 检查写入文件路径是否存在
  const writeFileExists = await pathExists(writeFilePath)
  if (writeFileExists) {
    program.error(`${pc.bgRed(`写入文件路径${writeFilePath}已存在，请检查`)}`)
  }
  await writeFile(writeFilePath, '')
  return writeFilePath
}

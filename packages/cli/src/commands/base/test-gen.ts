import { Command } from 'commander'
import ora from 'ora'
import { join } from 'path'
import prompts from 'prompts'

import { checkFileExist } from '../../utils/checkFileExist'
import { createFile } from '../../utils/createFile'
import { writeFileStream } from '../../utils/writeFile'

export const testGen = (program: Command) => {
  return program
    .createCommand('test:gen')
    .description('AI生成测试用例')
    .action(async () => {
      const { path, functionName } = await prompts([
        {
          type: 'text',
          name: 'functionName',
          message: '请输入要生成对应测试用例的名称'
        },
        {
          type: 'text',
          name: 'path',
          message: '请输入对应函数所在项目的相对路径'
        }
      ])
      const functionPath = join(process.cwd(), path, functionName)
      // 检查函数路径是否存在
      await checkFileExist(functionPath)
      const writeFilePath = await createFile(functionName, 'test')
      const spinner = ora(`正在生成${functionName}的测试用例...`).start()
      await writeFileStream(functionPath, writeFilePath, 'test')
      spinner.succeed(`${functionName}的测试用例已生成`)
    })
}

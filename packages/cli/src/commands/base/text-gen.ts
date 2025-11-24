import { Command } from 'commander'
import ora from 'ora'
import { join } from 'path'
import prompts from 'prompts'

import { checkFileExist } from '../../utils/checkFileExist'
import { createFile } from '../../utils/createFile'
import { writeFileStream } from '../../utils/writeFile'

export const textGen = (program: Command) => {
  return program
    .createCommand('text:gen')
    .description('AI生成组件Storybook文档')
    .action(async () => {
      const { path, componentName } = await prompts([
        {
          type: 'text',
          name: 'componentName',
          message: '请输入要生成对应文档的组件名称'
        },
        {
          type: 'text',
          name: 'path',
          message: '请输入对应组件所在项目的相对路径'
        }
      ])
      const componentPath = join(process.cwd(), path, componentName)
      // 检查组件路径是否存在
      await checkFileExist(componentPath)
      const writeFilePath = await createFile(componentName, 'summarize')
      const spinner = ora(`正在生成${componentName}的Storybook文档...`).start()
      await writeFileStream(componentPath, writeFilePath, 'summarize')
      spinner.succeed(`${componentName}的Storybook文档已生成`)
    })
}

import { readFile, writeFile } from 'fs-extra'
import ora from 'ora'
import prompts from 'prompts'

import { runAIStream } from '@tianniu-cli/ai'

import { GenType } from '../types/gen'

export async function writeFileStream(filePath: string, writeFilePath: string, options: GenType) {
  const { model } = await prompts({
    type: 'select',
    name: 'model',
    message: '请选择一个AI模型',
    choices: [
      {
        title: 'deepseek',
        value: 'deepseek-ai/DeepSeek-V3.2-Exp'
      },
      {
        title: '千文',
        value: 'Qwen/Qwen3-32B'
      },
      {
        title: '智谱',
        value: 'ZhipuAI/GLM-4.6'
      }
    ]
  })
  const spinner = ora(`正在生成${writeFilePath}的${options === 'summarize' ? 'Storybook文档' : '测试用例'}...`).start()

  // 读取文件内容
  const content = await readFile(filePath, 'utf-8')
  // 调用AI模型
  const stream = await runAIStream(content, options, model)
  for await (const part of stream) {
    const delta = part.choices[0]?.delta.content
    if (delta) {
      await writeFile(writeFilePath, delta, { flag: 'a' })
    }
  }
  spinner.succeed(`${writeFilePath}的Storybook文档已生成`)
}

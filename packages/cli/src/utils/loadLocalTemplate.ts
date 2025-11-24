import { copy, readJson, writeJson } from 'fs-extra'
import { join } from 'node:path'
import ora from 'ora'
import pc from 'picocolors'
import prompts from 'prompts'

import { templateChoices } from '../constants/template'
import { CreateCommandOptions } from '../types/create'

import { logger } from './logger'

export const loadTemplate = async (projectName: string, options: CreateCommandOptions) => {
  let { framework, template } = options
  // 没有选择框架
  if (!framework) {
    const res = await prompts({
      type: 'select',
      choices: [
        { title: 'vue', value: 'vue' },
        { title: 'react', value: 'react' },
        { value: 'vanilla', title: 'vanilla' }
      ],
      name: 'framework',
      message: '请选择一个技术栈'
    })

    framework = res.framework
  }

  // 没有选择模板
  if (!template) {
    const res = await prompts({
      type: 'select',
      choices: templateChoices[framework],
      name: 'template',
      message: '请选择你的技术栈'
    })

    template = res.template
  }
  // 没有选择模板
  if (!template) {
    const res = await prompts({
      type: 'select',
      choices: templateChoices[framework],
      name: 'template',
      message: '请选择一个模板'
    })

    template = res.template
  }

  logger.log(pc.bgGreen('开始创建项目'))
  logger.log(pc.green(`项目名称: ${projectName}`))
  logger.log(pc.green(`技术栈: ${framework}`))
  logger.log(pc.green(`模板: ${template}`))

  const spinner = ora({
    text: '正在创建项目',
    color: 'green'
  })
  spinner.start()

  const templatePath = join(__dirname, `../templates/template-${template}`)

  const projectPath = `${process.cwd()}/${projectName}`
  await copy(templatePath, projectPath)
  spinner.text = '拷贝模板完成'

  const originalPkg = await readJson(join(projectPath, 'package.json'))
  await writeJson(
    `${projectPath}/package.json`,
    {
      ...originalPkg,
      name: projectName,
      version: '1.0.0'
    },
    {
      spaces: 4
    }
  )

  spinner.stop()
}

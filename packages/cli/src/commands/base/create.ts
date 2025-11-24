import { Command } from 'commander'

import { CreateCommandOptions } from '../../types/create'
import { loadTemplate } from '../../utils/loadLocalTemplate'
import { loadRemoteTemplate } from '../../utils/loadRemoteTemplate'

export const create = (program: Command) => {
  return program
    .createCommand('create')
    .arguments('<project-name>')
    .option('-f, --framework <framework>', '请选择一个技术栈 vue/react')
    .option('-t, --template <template>', '请选择一个模板')
    .option('-r, --remote <remote>', '是否从远程模板创建项目')
    .description('基于技术栈和模板创建项目')
    .action(async (projectName: string, options: CreateCommandOptions) => {
      const { remote = false } = options
      if (remote) {
        await loadRemoteTemplate(projectName)
      } else {
        await loadTemplate(projectName, options)
      }
    })
}

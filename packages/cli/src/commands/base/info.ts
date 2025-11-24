import { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../../package.json'
import { logger } from '../../utils/logger'

export const info = (program: Command) => {
  return program
    .createCommand('info')
    .description('查看当前 cli 相关信息')
    .action(() => {
      logger.log(pc.green(`当前 cli 版本号: ${pkg.version}`))
      logger.log(pc.green(`当前 cli 名称: ${pkg.name}`))
      logger.log(pc.green(`当前 cli 描述: ${pkg.description}`))
      logger.log(pc.green(`当前 cli 作者: ${pkg.author}`))
    })
}

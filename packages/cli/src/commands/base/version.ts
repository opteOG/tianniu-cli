import { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../../package.json'
import { logger } from '../../utils/logger'

export const version = (program: Command) => {
  return program
    .createCommand('version')
    .description('显示版本号')
    .action(() => {
      logger.log(pc.green(pkg.version))
    })
}

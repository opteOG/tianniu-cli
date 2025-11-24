import { spawn } from 'child_process'
import { Command } from 'commander'

import { hasPnpm } from '../../utils/env'

export const build = (program: Command) => {
  return program
    .createCommand('build')
    .description('启动开发环境')
    .action(async () => {
      const _hasPnpm = hasPnpm()

      const command = _hasPnpm ? 'pnpm' : 'npm'
      const params = _hasPnpm ? ['build'] : ['run', 'build']

      const child = spawn(command, params, {
        stdio: 'inherit',
        shell: true
      })

      child.on('close', (code) => {
        process.exit(code)
      })
    })
}

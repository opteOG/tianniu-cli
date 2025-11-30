import { spawn } from 'child_process'
import { Command } from 'commander'

import { hasPnpm } from '../../utils/env'

export const preview = (program: Command) => {
  return program
    .createCommand('preview')
    .description('预览构建产物')
    .action(async () => {
      const _hasPnpm = hasPnpm()

      const command = _hasPnpm ? 'pnpm' : 'npm'
      const params = _hasPnpm ? ['preview'] : ['run', 'preview']
      const previewCommmand = `${command} ${params.join(' ')}`

      const child = spawn(previewCommmand, {
        stdio: 'inherit',
        shell: true
      })

      child.on('close', (code) => {
        process.exit(code)
      })
    })
}

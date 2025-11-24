import type { Command } from 'commander'
import { program } from 'commander'

type Fn = (p: Command) => Command

// 插件化机制来注册命令
export const registerCommand = (fn: Fn) => {
  program.addCommand(fn(program))
}


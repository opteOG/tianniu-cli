import { program } from 'commander'

import './commands'

export const runCLI = () => {
  program.parse(process.argv)
}

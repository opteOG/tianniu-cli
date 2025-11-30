import { Command } from "commander"

export const audit = (program: Command) => {
  return program
    .command('audit')
    .description('对构建产物进行 Lighthouse/Web Vitals 检查')
    .action(() => {
      console.log('审计构建产物')
    })
}

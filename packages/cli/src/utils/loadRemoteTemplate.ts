import { copy, readJson, remove, writeJson } from 'fs-extra'
import { downloadTemplate } from 'giget'
import ora from 'ora'
import pc from 'picocolors'

import { logger } from './logger'

export const loadRemoteTemplate = async (projectName: string) => {
  const spinner = ora({
    text: 'Download template loading...',
    color: 'green'
  }).start()

  try {
    const { dir } = await downloadTemplate('https://github.com/opteOG/tianniu-cli', {
      dir: `${process.cwd()}/.temp`
    })
    await copy(dir, `${process.cwd()}/${projectName}`)
    spinner.text = 'Copy template success'
    const projectPath = `${process.cwd()}/${projectName}`
    const originalPkg = await readJson(`${projectPath}/package.json`)
    await writeJson(
      `${projectPath}/package.json`,
      {
        ...originalPkg,
        name: projectName,
        version: '0.1.0'
      },
      {
        spaces: 4
      }
    )

    spinner.spinner = 'moon'
    spinner.text = pc.green(`Project named ${pc.bold(projectName)} created successfully!`)

    spinner.succeed()

    await remove(dir)
  } catch (error) {
    if (error instanceof Error) {
      logger.error(pc.red(`Download template failed. ${error.message}`))
    }
    spinner.fail()
  }
}

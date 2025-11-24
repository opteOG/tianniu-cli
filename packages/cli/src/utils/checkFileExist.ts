import { pathExists } from 'fs-extra'
import pc from 'picocolors'
export async function checkFileExist(filePath: string) {
  const exists = await pathExists(filePath)
  if (!exists) {
    throw new Error(`${pc.bgRed(`文件路径${filePath}不存在，请检查`)}`)
  }
}

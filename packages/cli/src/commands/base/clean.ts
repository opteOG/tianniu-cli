import { Command } from 'commander';
import { consola } from 'consola';
import fs from 'fs-extra';
import path from 'path';

interface CleanOptions {
  all?: boolean;
  dist?: boolean;
  nodeModules?: boolean;
  cache?: boolean;
  verbose?: boolean;
}

/**
 * 清理项目构建产物和缓存
 * @param program - Commander程序实例
 * @returns 配置的命令对象
 */
export const clean = (program: Command) => {
  return program
    .createCommand('clean')
    .description('清理项目构建产物和缓存文件')
    .option('-a, --all', '清理所有文件（包括node_modules）')
    .option('-d, --dist', '只清理dist目录')
    .option('-n, --node-modules', '清理node_modules目录')
    .option('-c, --cache', '清理缓存文件')
    .option('-v, --verbose', '显示详细清理过程')
    .action(async (options: CleanOptions) => {
      try {
        await performClean(options);
      } catch (error) {
        consola.error('清理失败:', error);
        process.exit(1);
      }
    });
};

/**
 * 执行清理操作
 * @param options - 清理选项
 */
async function performClean(options: CleanOptions): Promise<void> {
  const { all = false, dist = false, nodeModules = false, cache = false, verbose = false } = options;

  const logger = verbose ? consola : { info: () => {}, success: () => {}, warn: () => {} };

  logger.info('开始清理项目...');

  const cleanTargets: string[] = [];

  // 确定清理目标
  if (all) {
    cleanTargets.push('dist', 'node_modules', '.turbo', 'build', 'coverage');
  } else {
    if (dist) cleanTargets.push('dist');
    if (nodeModules) cleanTargets.push('node_modules');
    if (cache) cleanTargets.push('.turbo', 'build', 'coverage');

    // 默认清理dist和缓存
    if (!dist && !nodeModules && !cache) {
      cleanTargets.push('dist', '.turbo', 'build', 'coverage');
    }
  }

  let cleanedCount = 0;

  for (const target of cleanTargets) {
    const targetPath = path.resolve(process.cwd(), target);

    if (await fs.pathExists(targetPath)) {
      try {
        logger.info(`清理 ${target}...`);
        await fs.remove(targetPath);
        logger.success(`✓ 已清理 ${target}`);
        cleanedCount++;
      } catch (error) {
        consola.warn(`清理 ${target} 失败: ${error}`);
      }
    } else {
      logger.info(`跳过 ${target} (不存在)`);
    }
  }

  if (cleanedCount > 0) {
    consola.success(`清理完成！共清理 ${cleanedCount} 个项目。`);
  } else {
    consola.info('没有需要清理的项目。');
  }
}

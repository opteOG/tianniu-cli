import * as chromeLauncher from 'chrome-launcher'
import Table from 'cli-table3'
import { Command } from 'commander'
import { mkdir, writeFileSync } from 'fs-extra'
import lighthouse from 'lighthouse'
import { CliFlags, Result } from 'lighthouse'
import ora from 'ora'
import pc from 'picocolors'
import prompts from 'prompts'

import { runAISync } from '@/tianniu-cli/ai'

import { AuditOptions, Metric } from '../../types/audit'
import { logger } from '../../utils/logger'

export const audit = (program: Command) => {
  return program
    .createCommand('audit')
    .option('-u --url <url>', '指定要检查的 URL', 'http://localhost:4173')
    .description('对构建产物进行 Lighthouse/Web Vitals 检查')
    .action(async (options: AuditOptions) => {
      const { url } = options
      const lhr = await runAudit(url)
      if (!lhr) {
        console.error(pc.red('Lighthouse 性能采集失败'))
        return
      }
      const metrics = extractMetrics(lhr)
      metrics.forEach((item) => {
        item.score = item.score * 100
      })
      createTable(metrics)
      const totalScore = (lhr.categories.performance?.score as number) * 100
      if (totalScore < 80) {
        const { confirm } = await prompts([
          {
            type: 'confirm',
            name: 'confirm',
            message: `Lighthouse 性能检查总分 ${totalScore.toFixed(0)} 低于 80分，是否需要AI来给出优化建议？`
          }
        ])
        if (confirm) {
          const { model } = await prompts({
            type: 'select',
            name: 'model',
            message: '请选择一个AI模型',
            choices: [
              {
                title: 'deepseek',
                value: 'deepseek-ai/DeepSeek-V3.2-Exp'
              },
              {
                title: '千文',
                value: 'Qwen/Qwen3-32B'
              },
              {
                title: '智谱',
                value: 'ZhipuAI/GLM-4.6'
              }
            ]
          })
          const spinner = ora({
            text: '正在思考中...',
            spinner: 'circle'
          }).start()
          const response = await runAISync(metrics, 'metric', model)
          logger.log(response.choices[0]?.message.content)
          spinner.stop()
        }
      }
    })
}

// 启动 Chrome 并运行 Lighthouse 审计
async function runAudit(url: string) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless']
  })
  const flags: Partial<CliFlags> = { logLevel: 'info', output: ['json', 'html'], onlyCategories: ['performance'], port: chrome.port }
  const runnerResult = await lighthouse(url, flags)
  if (!runnerResult) {
    console.error('Lighthouse 运行失败')
    chrome.kill()
    return
  }
  try {
    mkdir('audit-report', { recursive: true })
    writeFileSync('audit-report/report.json', runnerResult.report[0] as string)
    writeFileSync('audit-report/report.html', runnerResult.report[1] as string)
  } catch (error) {
    console.error('写入报告失败', error)
  }

  chrome.kill()
  return runnerResult.lhr
}

// 提取并格式化 Lighthouse 审计结果中的指标
// 包括总分、LCP、TBT、CLS、FCP
function extractMetrics(lhr: Result): Metric[] {
  const audits = lhr.audits

  return [
    {
      name: '总分',
      value: lhr.categories.performance?.score ?? 0,
      score: lhr.categories.performance?.score ?? 0
    },
    {
      name: 'LCP',
      value: audits['largest-contentful-paint']?.displayValue ?? 0,
      score: audits['largest-contentful-paint']?.score ?? 0
    },
    {
      name: 'TBT',
      value: audits['total-blocking-time']?.displayValue ?? 0,
      score: audits['total-blocking-time']?.score ?? 0
    },
    {
      name: 'CLS',
      value: audits['cumulative-layout-shift']?.displayValue ?? 0,
      score: audits['cumulative-layout-shift']?.score ?? 0
    },
    {
      name: 'FCP',
      value: audits['first-contentful-paint']?.displayValue ?? 0,
      score: audits['first-contentful-paint']?.score ?? 0
    }
  ]
}

// 创建终端表格
function createTable(metrics: Metric[]) {
  const table = new Table({ head: ['指标', '值', '分数'] })
  metrics.forEach((metric) => {
    const formatter = metric.score >= 90 ? pc.green : metric.score >= 50 ? pc.yellow : pc.red
    table.push({ [metric.name]: [formatter(metric.value), formatter(metric.score.toFixed(0))] })
  })
  console.log(table.toString())
}

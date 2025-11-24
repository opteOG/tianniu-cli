import { openai } from './client'
import { promts } from './promts'

export async function runAI(content: string, type: 'summarize' | 'test') {
  const stream = await openai.chat.completions.create({
    model: 'deepseek-ai/DeepSeek-V3.2-Exp',
    messages: [
      {
        role: 'system',
        content: promts.character()
      },
      {
        role: 'user',
        content: promts[type](content)
      }
    ],
    stream: true
  })

  return stream
}

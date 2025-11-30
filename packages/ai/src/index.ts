import { openai } from './client'
import { prompts } from './promts'
import { PromptType } from './types'
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function runAIStream(content: any, type: PromptType, model: string) {
  const stream = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: 'system',
        content: prompts.character()
      },
      {
        role: 'user',
        content: prompts[type](content)
      }
    ],
    stream: true
  })
  return stream
}
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function runAISync(content: any, type: PromptType, model: string) {
  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: 'system',
        content: prompts.character()
      },
      {
        role: 'user',
        content: prompts[type](content)
      }
    ],
    stream: false
  })
  return response
}

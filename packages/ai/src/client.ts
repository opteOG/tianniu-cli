import dotenv from 'dotenv'
import OpenAI from 'openai'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY 环境变量未设置')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL
})

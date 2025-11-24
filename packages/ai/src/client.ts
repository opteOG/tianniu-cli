import dotenv from 'dotenv'
import OpenAI from 'openai'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL
})

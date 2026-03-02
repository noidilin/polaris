import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { inngest } from './client'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s')
    return { message: `Hello ${event.data.email}!` }
  },
)

export const demoGoogle = inngest.createFunction(
  { id: 'demo-generate' },
  { event: 'demo/generate' },
  async ({ step }) => {
    await step.run('generate-text', async () => {
      return await generateText({
        model: google('gemini-2.5-flash'),
        prompt: 'Write a concise pork ramen recipe.',
      })

      // return Response.json(text)
    })
  },
)

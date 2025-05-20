import { MastraClient } from '@mastra/client-js'

const client = new MastraClient({
  baseUrl: process.env.MASTRA_URI || 'http://localhost:4111' // Default Mastra development server port
})

export default client

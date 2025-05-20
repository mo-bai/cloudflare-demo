import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from './App'
import './tailwind'

// 配置 Apollo Client
const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI, // 替换为你的 GraphQL 后端地址
  cache: new InMemoryCache()
})

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

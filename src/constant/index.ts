import { gql } from '@apollo/client'

// 定义 GraphQL Mutation
export const SEND_MESSAGE = gql`
  query chat($message: [QueryMessage!]!) {
    chat(message: $message) {
      id
      choices {
        finish_reason
        index
        message {
          role
          content
        }
      }
    }
  }
`

export const AGENTS = {
  codeReview: 'codeReviewAgent'
} as const

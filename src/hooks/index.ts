import { useMemo, useState } from 'react'
import { AGENTS, SEND_MESSAGE } from '../constant'
import mastraClient from '../utils/mastraClient'
import { useLazyQuery } from '@apollo/client'

export const useChat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  )
  const [agentLoading, setAgentLoading] = useState(false)
  const [agentError, setAgentError] = useState<Error | null>(null)
  const [makeChat, { loading: normalLoading, error: normalError }] =
    useLazyQuery(SEND_MESSAGE)

  const loading = useMemo(() => {
    return agentLoading || normalLoading
  }, [agentLoading, normalLoading])

  const error = useMemo(() => {
    if (agentError || normalError) {
      return agentError || normalError
    }
    return null
  }, [agentError, normalError])

  const normalChat = async (
    newMessages: { role: string; content: string }[]
  ) => {
    const { data } = await makeChat({ variables: { message: newMessages } })
    if (data) {
      setMessages([
        ...newMessages,
        {
          role: data.chat.choices[0].message.role,
          content: data.chat.choices[0].message.content
        }
      ])
    }
  }

  const agentChat = async (newMessage: string, agentId: string) => {
    const agent = mastraClient.getAgent(agentId)
    try {
      setAgentLoading(true)
      const response = await agent.generate({
        messages: [{ role: 'user', content: newMessage }]
      })
      if (response.text && response.finishReason == 'stop') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: response.text }
        ])
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: response.text }
        ])
      }
    } catch (err) {
      setAgentError(err as Error)
    }
    setAgentLoading(false)
  }

  const handleSend = async (
    message: string,
    agentId?: (typeof AGENTS)[keyof typeof AGENTS]
  ) => {
    if (!message.trim()) return
    if (loading) return
    setAgentError(null)
    let newInput = message.trim()
    let newMessages = [...messages, { role: 'user', content: newInput }]
    setMessages(newMessages)
    if (!agentId) {
      normalChat(newMessages)
    } else {
      agentChat(newInput, agentId)
    }
  }

  const clearMessages = () => {
    setMessages([])
    setAgentLoading(false)
    setAgentError(null)
  }

  return {
    messages,
    loading,
    error,
    handleSend,
    clearMessages
  }
}

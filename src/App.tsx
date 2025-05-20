import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { AGENTS } from './constant'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useChat } from './hooks'
import 'highlight.js/styles/github-dark.min.css'

type AgentIds = (typeof AGENTS)[keyof typeof AGENTS]
const App = () => {
  const [input, setInput] = useState('')
  const { messages, loading, error, handleSend, clearMessages } = useChat()
  const [agentId, setAgentId] = useState<AgentIds | undefined>(undefined)

  const changeAgent = (id: AgentIds) => {
    clearMessages()
    if (id === agentId) {
      setAgentId(undefined)
    } else {
      setAgentId(id)
    }
  }

  const sendMessage = () => {
    if (loading) return
    if (!input.trim()) return
    handleSend(input, agentId)
    setInput('')
  }
  return (
    <div>
      <h1 className='title'>DeepSeek</h1>
      <div className='message_area'>
        {messages.map((msg, index) => (
          <div
            className='message'
            data-role={msg.role}
            key={index}
            style={{ width: '100%' }}>
            <div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className='message'>
            <div>
              <svg
                className='loading'
                viewBox='0 0 50 50'
                width='24'
                height='24'
                fill='currentColor'>
                <circle
                  cx='25'
                  cy='25'
                  r='20'
                  stroke='currentColor'
                  strokeWidth='4'
                  strokeDasharray='90 30'
                  strokeLinecap='round'
                  fill='none'
                />
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 0 0'
                  to='360 0 0'
                  dur='1s'
                  repeatCount='indefinite'
                />
              </svg>
            </div>
          </div>
        )}
        {!loading && error && (
          <p className='error'>发生错误: {error?.message}</p>
        )}
        {messages.length > 0 && !loading && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}>
            <button className='newChat-button' onClick={() => clearMessages()}>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.856 17.121a.979.979 0 0 1-.327-.06.839.839 0 0 1-.283-.177.739.739 0 0 1-.187-.255.724.724 0 0 1-.07-.303l-.02-1.609a4.663 4.663 0 0 1-1.446-.455 4.252 4.252 0 0 1-.637-.401c-.199-.146-.385-.31-.553-.492a4.442 4.442 0 0 1-.45-.577 4.303 4.303 0 0 1-.327-.637 3.823 3.823 0 0 1-.206-.686 3.729 3.729 0 0 1-.064-.704V6.478c0-.261.025-.516.077-.771a4.43 4.43 0 0 1 .244-.747 4.062 4.062 0 0 1 .932-1.28c.2-.183.418-.347.65-.493.23-.145.482-.267.739-.364a4.21 4.21 0 0 1 .81-.225c.27-.054.553-.078.835-.078H8.55c.103 0 .2.018.29.054a.7.7 0 0 1 .411.376.667.667 0 0 1-.161.766.736.736 0 0 1-.25.151.764.764 0 0 1-.29.055H5.573c-.186 0-.366.012-.54.049-.18.03-.353.079-.52.145-.167.061-.328.14-.482.237-.148.091-.29.2-.418.316a2.897 2.897 0 0 0-.347.388c-.097.14-.187.286-.257.444a2.473 2.473 0 0 0-.206.977v4.287c0 .17.013.333.051.503a2.549 2.549 0 0 0 .772 1.33 2.721 2.721 0 0 0 .913.559c.167.066.347.115.527.152.18.03.36.048.546.048a.904.904 0 0 1 .61.23.848.848 0 0 1 .194.262.84.84 0 0 1 .07.303l.007.99 1.915-1.293a2.877 2.877 0 0 1 1.64-.492h2.372c.186 0 .366-.018.54-.048.18-.03.353-.08.52-.146.168-.067.329-.146.483-.237.148-.091.29-.2.418-.316.128-.121.244-.249.347-.388a2.8 2.8 0 0 0 .257-.444 2.47 2.47 0 0 0 .206-.977V8.585a.646.646 0 0 1 .225-.492.679.679 0 0 1 .244-.152.814.814 0 0 1 .585 0c.09.03.174.085.244.152a.657.657 0 0 1 .225.492V10.8c0 .261-.032.516-.083.771a4.192 4.192 0 0 1-.245.74c-.109.244-.244.468-.398.687a3.735 3.735 0 0 1-.534.6c-.2.183-.418.347-.65.493a4.134 4.134 0 0 1-.738.364 4.7 4.7 0 0 1-.81.225c-.27.054-.553.079-.836.079h-1.877c-.604 0-1.144.164-1.633.491l-2.54 1.713a.913.913 0 0 1-.514.157z'
                  fill='currentColor'></path>
                <path
                  d='M15.866 4.125h-4.174c-.41 0-.741.313-.741.7 0 .387.332.7.741.7h4.174c.41 0 .742-.313.742-.7 0-.387-.332-.7-.742-.7z'
                  fill='currentColor'></path>
                <path
                  d='M14.537 2.932c0-.396-.34-.717-.759-.717s-.758.32-.758.717v3.786c0 .396.34.717.758.717.42 0 .76-.321.76-.717V2.932z'
                  fill='currentColor'></path>
              </svg>
              <span>开启新对话</span>
            </button>
          </div>
        )}
      </div>
      <div className='input_area'>
        <div className='flex items-center w-full py-2'>
          <button
            onClick={() => changeAgent(AGENTS.codeReview)}
            className={`h-8 text-sm px-2 flex items-center gap-x-1 rounded-full border-none ${
              agentId == AGENTS.codeReview
                ? 'text-blue-500 bg-blue-300'
                : 'text-white bg-gray-800'
            }`}>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              focusable='false'
              aria-hidden='true'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14.49 4.19a1.5 1.5 0 0 0-2.98-.38l-2 16a1.5 1.5 0 1 0 2.98.38l2-16ZM8.06 5.94a1.5 1.5 0 0 1 0 2.12L4.12 12l3.94 3.94a1.5 1.5 0 1 1-2.12 2.12l-5-5a1.5 1.5 0 0 1 0-2.12l5-5a1.5 1.5 0 0 1 2.12 0Zm7.88 0a1.5 1.5 0 0 1 2.12 0l5 5a1.5 1.5 0 0 1 0 2.12l-5 5a1.5 1.5 0 0 1-2.12-2.12L19.88 12l-3.94-3.94a1.5 1.5 0 0 1 0-2.12Z'
                fill='currentColor'></path>
            </svg>
            <span className='text-xs'>代码审查</span>
          </button>
        </div>
        <div style={{ width: '100%', position: 'relative' }}>
          <textarea
            placeholder='输入消息...'
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
          />
          <button onClick={() => sendMessage()} className='submit_button'>
            {loading ? (
              <svg
                className='loading'
                viewBox='0 0 50 50'
                width='16'
                height='16'
                fill='currentColor'>
                <circle
                  cx='25'
                  cy='25'
                  r='20'
                  stroke='currentColor'
                  strokeWidth='4'
                  strokeDasharray='90 30'
                  strokeLinecap='round'
                  fill='none'
                />
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 0 0'
                  to='360 0 0'
                  dur='1s'
                  repeatCount='indefinite'
                />
              </svg>
            ) : (
              <svg
                viewBox='0 0 24 24'
                width='16'
                height='16'
                fill='currentColor'>
                <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

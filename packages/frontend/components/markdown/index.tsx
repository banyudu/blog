import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../codeblock'
import './index.less'

interface MarkdownProps {
  source: string
  className?: string
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { source, className } = props
  return (
    <ReactMarkdown
      source={source}
      renderers={{ code: CodeBlock }}
      className={className}
    />
  )
}

export default Markdown

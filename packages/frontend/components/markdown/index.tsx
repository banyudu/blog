import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../codeblock'
import './index.less'

interface MarkdownProps {
  source: string
  className?: string
}

function LinkRenderer (props) {
  return <a href={props.href} target='_blank' rel='noopener noreferrer'>{props.children}</a>
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { source, className } = props
  return (
    <ReactMarkdown
      source={source}
      renderers={{
        code: CodeBlock,
        link: LinkRenderer
      }}
      className={`${className} markdown`}
    />
  )
}

export default Markdown

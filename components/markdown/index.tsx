import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../codeblock'
import gfm from "remark-gfm";

interface MarkdownProps {
  source: string
}

function LinkRenderer (props) {
  return <a href={props.href} target='_blank' rel='noopener noreferrer'>{props.children}</a>
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { source } = props
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={{
        code: CodeBlock,
        a: LinkRenderer
      }}
      className='w-full'
    >
      {source}
    </ReactMarkdown>
  )
}

export default Markdown

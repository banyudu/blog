import React, { FC } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const CodeBlock: FC<any> = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match?.[1]
  return !inline && match
    ? (
    <SyntaxHighlighter
      language={language === 'react' ? 'javascript' : language}
      showLineNumbers={!inline}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
      )
    : (
    <code className={className} {...props}>
      {children}
    </code>
      )
}

export default CodeBlock

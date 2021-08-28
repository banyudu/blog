import React, { FC, useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useDarkMode from 'use-dark-mode'

const CodeBlock: FC<any> = ({ node, inline, className, children, ...props }) => {
  const darkMode = useDarkMode(false)
  const [style, setStyle] = useState<any>(undefined)
  const hasWindow = typeof window !== 'undefined'

  useEffect(() => {
    if (hasWindow) {
      const { materialDark, materialLight } = require('react-syntax-highlighter/dist/esm/styles/prism')
      setStyle(darkMode ? materialDark: materialLight)
    }
  }, [darkMode, hasWindow])

  const match = /language-(\w+)/.exec(className || '')
  const language = match?.[1]
  return !inline && match
    ? (
    <SyntaxHighlighter
      language={language === 'react' ? 'javascript' : language}
      showLineNumbers={!inline}
      style={style}
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

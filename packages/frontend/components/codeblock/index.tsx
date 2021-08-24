import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface CodeBlockProps {
  language: string
  value: string
}

class CodeBlock extends PureComponent<CodeBlockProps> {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  }

  static defaultProps = {
    language: null
  }

  render () {
    const { language, value = '' } = this.props
    const showLineNumbers = value.split('\n').length > 3
    return (
      <SyntaxHighlighter
        language={language === 'react' ? 'javascript' : language}
        showLineNumbers={showLineNumbers}
      >
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock

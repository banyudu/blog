import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import './index.less'

interface CodeBlockProps {
  language: string
  value: string
}

class CodeBlock extends PureComponent<CodeBlockProps> {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render () {
    const { language, value } = this.props
    if (language === 'mermaid') {
      return <div className='mermaid'>{value}</div>
    }
    return (
      <SyntaxHighlighter language={language === 'react' ? 'javascript' : language} style={codeStyle}>
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock

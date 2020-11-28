import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { solarizedlight as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import loadable from '@loadable/component'
import './index.less'

const Mermaid = loadable(async () => import('react-mermaid2'))

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
    const { language, value = '' } = this.props
    const showLineNumbers = value.includes('\n')
    if (language === 'mermaid') {
      // return <div className='mermaid'>{value}</div>
      return <Mermaid chart={value} />
    }
    return (
      <SyntaxHighlighter
        language={language === 'react' ? 'javascript' : language}
        // style={codeStyle}
        showLineNumbers={showLineNumbers}
      >
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock

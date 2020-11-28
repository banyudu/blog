import React, { FC } from 'react'
import { ButtonAttributes } from '../../types'
import { Tag, Card } from 'antd'
import './index.less'
import Link from 'next/link'

interface ButtonBoxProps {
  buttons: ButtonAttributes[]
  activeKey?: string
  onSelect?: (key: string) => void
}

const ButtonBox: FC<ButtonBoxProps> = (props) => {
  const { buttons = [] } = props

  return (
    <Card className='button-box'>
      {buttons.map(btn => (
        <Link key={btn.name} href={btn.link ?? ''}>
          <Tag closable={false}>{btn.name}</Tag>
        </Link>
      ))}
    </Card>
  )
}

export default ButtonBox

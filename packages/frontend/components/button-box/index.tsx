import React, { FC } from 'react'
import { ButtonAttributes } from '../../types'
import { Tag, Card } from 'antd'
import './index.less'

interface ButtonBoxProps {
  buttons: ButtonAttributes[]
}

const ButtonBox: FC<ButtonBoxProps> = (props) => {
  const { buttons = [] } = props

  return (
    <Card className='button-box'>
      {
        buttons.map(btn => (<Tag key={btn.name} closable={false}>{btn.name}</Tag>))
      }
    </Card>
  )
}

export default ButtonBox

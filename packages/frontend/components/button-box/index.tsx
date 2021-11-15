import React, { FC } from 'react'
import { ButtonAttributes } from '../../types'
import Link from 'next/link'

interface ButtonBoxProps {
  buttons: ButtonAttributes[]
  activeKey?: string
  // onSelect?: (key: string) => void
}

const ButtonBox: FC<ButtonBoxProps> = (props) => {
  const { buttons = [], activeKey } = props
  console.log('activeKey is: ', activeKey)

  return (
    <div className='button-box'>
      {buttons.map(btn => (
        <Link key={btn.name} href={btn.link ?? ''}>
          <div className='text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full'>{btn.name}</div>
        </Link>
      ))}
    </div>
  )
}

export default ButtonBox

import React, { FC } from 'react'
import Link from 'next/link'
import './index.less'

const Logo: FC<any> = (props) => {
  return (
    <Link href='/'>
      <img className='logo' src='/static/images/logo.png' />
    </Link>
  )
}

export default Logo

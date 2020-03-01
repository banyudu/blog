import React, { FC } from 'react'
import Link from 'next/link'
import './index.less'
import logo from './logo.png'

const Logo: FC<any> = (props) => {
  return (
    <Link href='/'>
      <img className='logo' src={logo} />
    </Link>
  )
}

export default Logo

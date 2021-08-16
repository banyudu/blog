import React, { FC } from 'react'
import Link from 'next/link'

const Logo: FC<any> = (props) => {
  return (
    <Link href='/' {...props}>
      <img className='cursor-pointer bg-gray-50 rounded-full w-14 h-14' src='/assets/images/logo.png' />
    </Link>
  )
}

export default Logo

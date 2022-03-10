import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Logo: FC<any> = (props) => {
  return (
    <Link passHref href='/' {...props}>
      <Image className='cursor-pointer bg-gray-50 rounded-full w-14 h-14' src='/assets/images/logo.png' alt='logo' />
    </Link>
  )
}

export default Logo

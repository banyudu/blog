import React, { FC } from 'react'
import Logo from '../logo'
import Link from 'next/link'

const Header: FC<{}> = () => {
  return (
    <header className='mb-8'>
      <div className='flex flex-row'>
        <div className='mr-4'>
          <Logo />
        </div>
        <div className='flex flex-col justify-center flex-grow'>
          <div className='flex flex-row justify-between'>
            <Link href='/' passHref><p>鱼肚的博客</p></Link>
            <p>Don&apos;t Repeat Yourself</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

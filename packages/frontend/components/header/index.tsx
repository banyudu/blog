import React, { FC } from 'react'
import Logo from '../logo'

const Header: FC<{}> = () => {
  return (
    <header className='mb-12'>
      <div className='flex flex-row'>
        <div className='mr-4'>
          <Logo />
        </div>
        <div className='flex flex-col justify-center flex-grow'>
          <div className='flex flex-row justify-between'>
            <a href='/'><p>鱼肚的博客</p></a>
            <p>技术宅改变世界</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

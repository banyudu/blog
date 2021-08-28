import React, { FC } from 'react'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout: FC<{ children: JSX.Element | JSX.Element[]}> = ({ children }) => {
  return (
    <div className='dark:text-gray-300 dark:bg-gray-800 w-full h-full'>
      <div className='ml-auto mr-auto px-4 py-8 max-w-2xl text-lg '>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout

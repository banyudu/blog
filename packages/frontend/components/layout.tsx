import React, { FC } from 'react'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout: FC<{ children: JSX.Element | JSX.Element[]}> = ({ children }) => {
  return (
    <div className='dark:text-gray-300 dark:bg-gray-800 w-full h-full'>
      <div className='ml-auto mr-auto px-4 py-8 max-w-4xl text-lg box-border'>
        <Header />
        <div className='box-border rounded-lg border border-gray-500 p-8 border-opacity-30'>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

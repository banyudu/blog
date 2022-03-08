import React, { FC } from 'react'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout: FC<{ children: JSX.Element | JSX.Element[]}> = ({ children }) => {
  return (
    <div className='dark:text-white dark:bg-gray-800 w-full h-full'>
      <div className='md:mx-auto px-4 py-8 max-w-4xl box-border'>
        <Header />
        <div className='box-border rounded-lg md:border border-gray-500 p-1 md:p-8 border-opacity-30 list-disc'>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

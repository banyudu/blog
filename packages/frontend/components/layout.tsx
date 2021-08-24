import React, { FC } from 'react'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout: FC<{ children: JSX.Element | JSX.Element[]}> = ({ children }) => {
  return (
    <div className='ml-auto mr-auto my-4 px-4 py-8 max-w-2xl text-lg'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

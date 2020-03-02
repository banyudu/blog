import React from 'react'
import Head from 'next/head'
import './index.less'
import { NextPage } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'

const App: NextPage = () => {
  return (
    <div className='App'>
      <Head>
        <title>鱼肚的博客</title>
      </Head>
      <Header />
      <article className='App-content'>
        <img src='/logo.svg' className='App-logo' alt='logo' />
      </article>
      <Footer />
    </div>
  )
}

App.getInitialProps = ({ res }) => {
  // set cachec-control
  // if (res) {
  //   res.setHeader('Cache-Control', 'max-age=86400, public')
  // }
  return {}
}

export default App

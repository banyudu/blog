import React from 'react'
import Head from 'next/head'
import './index.less'
import { NextPage } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'
import { getPosts } from '../services/post'

const App: NextPage = () => {
  return (
    <div className='App'>
      <Head>
        <title>Yudu</title>
      </Head>
      <Header />
      <article className='App-content'>
        <img src='/logo.svg' className='App-logo' alt='logo' />
      </article>
      <Footer />
    </div>
  )
}

App.getInitialProps = async ({ res }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=86400, public') // one day
  }
  const postsRes = await getPosts()
  return {
    posts: postsRes.posts
  }
}

export default App

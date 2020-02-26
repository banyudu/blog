import React from 'react'
import Head from 'next/head'
import './index.less'
import { NextPage } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'
import { getPosts } from '../services/post'
import Link from 'next/link'

interface AppInterface {
  posts: Post[]
}

const App: NextPage<AppInterface> = (props) => {
  const { posts } = props
  return (
    <div className='App'>
      <Head>
        <title>Yudu</title>
      </Head>
      <Header />
      <article className='App-content'>
        <ul>
          {posts.map(post =>
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          )}
        </ul>
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

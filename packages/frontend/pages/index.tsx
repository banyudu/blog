import React from 'react'
import Head from 'next/head'
import './index.less'
import { NextPage } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'
import { getPosts } from '../services/post'
import Link from 'next/link'
import moment from 'moment'
import { Timeline } from 'antd'

interface PostWithTimeline extends Post {
  timeline?: string
}

interface AppInterface {
  posts: PostWithTimeline[]
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
        <Timeline mode='left'>
          {posts.map(post =>
            <Timeline.Item key={post.id} label={post.timeline ?? undefined}>
              <Link href={{ pathname: `/posts/${post.url}`, query: { random: process.env.random } }}>
                <a>{post.title}</a>
              </Link>
            </Timeline.Item>
          )}
        </Timeline>
      </article>
      <Footer />
    </div>
  )
}

App.getInitialProps = async ({ res }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=300, public') // 5 minutes
  }
  const postsRes: PostWithTimeline[] = await getPosts()
  let lastTimeline = ''
  for (const post of postsRes) {
    const timeline = moment(post.createdAt).format('YYYY-MM')
    if (lastTimeline !== timeline) {
      post.timeline = timeline
      lastTimeline = timeline
    }
  }
  return {
    posts: postsRes
  }
}

export default App

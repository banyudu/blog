import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'
import { getPosts } from '../services/post'
import moment from 'moment'
import { Carousel } from 'antd'
import Slide from '../components/slide'
import { Post, PostWithTimeline } from '../types'
import Posts from '../components/posts'
import './index.less'

interface AppInterface {
  posts: PostWithTimeline[]
}

interface SlidesProps {
  posts: Post[]
  count: number
}

const Slides: React.FC<SlidesProps> = (props) => {
  const { posts = [], count } = props
  const items: React.ReactNode[] = []
  for (let i = 0; i < count && i < posts.length; i++) {
    const post = posts[i]
    items.push(<Slide key={post.id} post={post} />)
  }
  return (
    <Carousel
      effect='fade'
      autoplay
      arrows
      dotPosition='right'
      dots={false}
      accessibility
      className='slides'
      easing='ease-in-out'
    >
      {items}
    </Carousel>
  )
}

const App: NextPage<AppInterface> = (props) => {
  const { posts = [] } = props
  const slidesCount = Math.min(3, posts.length)
  return (
    <div className='App'>
      <Head>
        <title>鱼肚的博客</title>
      </Head>
      <Header />
      <article className='App-content'>
        <Slides posts={posts} count={slidesCount} />
        <Posts posts={posts} />
      </article>
      <Footer />
    </div>
  )
}

App.getInitialProps = async ({ res }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=1800, public') // 5 minutes
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

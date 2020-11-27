import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
// import Header from '../components/header'
import Footer from '../components/footer'
import { getPosts } from '../services/post'
import moment from 'moment'
import { Carousel } from 'antd'
import Slide from '../components/slide'
import { Post, PostWithTimeline } from '../types'
import Posts from '../components/posts'
import './index.less'

// interface AppInterface {
//   posts: PostWithTimeline[]
// }

interface SlidesProps {
  posts: Post[]
  count?: number
}

const Slides: React.FC<SlidesProps> = (props) => {
  const { posts = [] } = props
  const count = Math.min(posts.length, props.count ?? 3)
  if (!count) {
    return <></>
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
      {posts.filter((_data, index) => index < count).map(post => <Slide key={post.id} post={post} />)}
    </Carousel>
  )
}

const App: NextPage = (props) => {
  const [posts, setPosts] = useState<PostWithTimeline[]>([])
  useEffect(() => {
    getPostsWithTimeline().then(data => setPosts(data)).catch(console.error)
  }, [])
  return (
    <div className='App'>
      <Head>
        <title>鱼肚的博客</title>
      </Head>
      {/* <Header
        title='鱼肚的博客'
        gitUrl='https://github.com/banyudu'
      /> */}
      <article className='App-content'>
        <Slides posts={posts} />
        <Posts posts={posts} />
      </article>
      <Footer />
    </div>
  )
}

async function getPostsWithTimeline (): Promise<PostWithTimeline[]> {
  // set cachec-control
  const postsRes: PostWithTimeline[] = await getPosts()
  let lastTimeline = ''
  for (const post of postsRes) {
    const timeline = moment(post.createdAt).format('YYYY-MM')
    if (lastTimeline !== timeline) {
      post.timeline = timeline
      lastTimeline = timeline
    }
  }
  return postsRes
}

export default App

import React from 'react'
import Head from 'next/head'
import { NextPage, GetStaticProps } from 'next'
// import Header from '../components/header'
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

const App: NextPage<AppInterface> = ({ posts }) => {
  // const [posts, setPosts] = useState<PostWithTimeline[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  // useEffect(() => {
  //   getPostsWithTimeline().then(data => {
  //     setPosts(data)
  //     setLoading(false)
  //   }).catch(console.error)
  // }, [])
  return (
    <div className='App'>
      <Head>
        <title>鱼肚的博客</title>
      </Head>
      <article className='App-content'>
        {/* {loading
          ? <div className='app-loading'><Spin /></div>
          : <>
            <Slides posts={posts} />
            <Posts posts={posts} />
          </>} */}
        <>
          <Slides posts={posts} />
          <Posts posts={posts} />
        </>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  // Pass post data to the page via props
  const posts = await getPostsWithTimeline()
  return {
    props: { posts },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 60 * 60
  }
}

export default App

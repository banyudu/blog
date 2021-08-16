import React from 'react'
import Head from 'next/head'
import { NextPage, GetStaticProps } from 'next'
import { getPosts } from 'services/post'
import dayjs from 'dayjs'
import { PostWithTimeline } from 'types'
import Posts from 'components/posts'
import Layout from 'components/layout'

interface AppInterface {
  posts: PostWithTimeline[]
}

const App: NextPage<AppInterface> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>🐠鱼肚的博客</title>
      </Head>
      <div>
        <main>
          <Posts posts={posts} />
        </main>
      </div>
    </Layout>
  )
}

async function getPostsWithTimeline (): Promise<PostWithTimeline[]> {
  // set cachec-control
  const postsRes: PostWithTimeline[] = await getPosts()
  let lastTimeline = ''
  for (const post of postsRes) {
    const timeline = dayjs(post.createdAt).format('YYYY-MM')
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
    props: { posts }
  }
}

export default App

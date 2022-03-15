import React from 'react'
import { NextPage } from 'next'
import Posts from 'components/posts'
import Layout from 'components/layout'
import { usePosts } from 'hooks'
import { getPosts } from 'services/graph'

interface BlogProps {
  posts: any[]
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const { posts: latestPosts, loading } = usePosts()
  return (
    <Layout>
      { loading ? null : <Posts posts={loading ? posts : latestPosts} /> }
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts
    }
  }
}

export default Blog

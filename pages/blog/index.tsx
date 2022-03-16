import React from 'react'
import { NextPage } from 'next'
import Posts from 'components/posts'
import Layout from 'components/layout'
import { usePosts } from 'hooks'


const Blog: NextPage = () => {
  const { posts, loading } = usePosts()
  return (
    <Layout loading={loading}>
      { loading ? null : <Posts posts={posts} /> }
    </Layout>
  )
}

export default Blog

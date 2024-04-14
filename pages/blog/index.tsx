import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Posts from 'components/posts'
import Layout from 'components/layout'
import { usePosts } from 'hooks'
import { getPosts } from 'services/graph'
import { Post } from 'types'

const Blog: NextPage<{posts: Post[]}> = ({ posts: staticPosts }) => {
  const { posts } = usePosts()
  return (
    <Layout>
      <Posts posts={posts ?? staticPosts} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: {
      posts
    },
  };
};

export default Blog

import React from 'react'
// import Head from 'next/head'
import { NextPage } from 'next'
import { getCategories, getPosts } from '../../services/post'
// import Link from 'next/link'
import moment from 'moment'
import { Category, Post } from '../../types'
import './index.less'
import Posts from '../../components/posts'
import ButtonBox from '../../components/button-box'

interface PostWithTimeline extends Post {
  timeline?: string
}

interface CategoriesInterface {
  posts: PostWithTimeline[]
  categories: Category[]
}

const Categories: NextPage<CategoriesInterface> = (props) => {
  const { posts = [], categories = [] } = props
  return (
    <div className='categories'>
      <ButtonBox
        buttons={categories.map(item => ({
          name: item.name,
          badge: String(item.blogCount)
        }))}
      />
      <Posts posts={posts} />
    </div>
  )
}

Categories.getInitialProps = async ({ res }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=1800, public') // 5 minutes
  }
  const postsRes: PostWithTimeline[] = await getPosts()
  const categories: Category[] = await getCategories()
  let lastTimeline = ''
  for (const post of postsRes) {
    const timeline = moment(post.createdAt).format('YYYY-MM')
    if (lastTimeline !== timeline) {
      post.timeline = timeline
      lastTimeline = timeline
    }
  }
  return {
    posts: postsRes,
    categories
  }
}

export default Categories

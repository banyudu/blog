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
import Header from '../../components/header'

interface PostWithTimeline extends Post {
  timeline?: string
}

interface CategoriesInterface {
  posts: PostWithTimeline[]
  categories: Category[]
  category: string
}

const Categories: NextPage<CategoriesInterface> = (props) => {
  const { posts = [], categories = [], category } = props
  return (
    <>
      <Header
        title='鱼肚的博客'
        gitUrl='https://github.com/banyudu'
      />
      <div className='categories article'>
        <ButtonBox
          buttons={categories.map(item => ({
            name: item.name,
            badge: String(item.postCount),
            link: `/category/${item.name}`
          }))}
          activeKey={category}
        />
        <Posts posts={posts} />
      </div>
    </>
  )
}

Categories.getInitialProps = async ({ res, query }) => {
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
    categories,
    category: query.category
  }
}

export default Categories

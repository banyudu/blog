import React from 'react'
// import Head from 'next/head'
import { NextPage } from 'next'
import { getTags, getPosts } from '../../services/post'
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

interface TagsInterface {
  posts: PostWithTimeline[]
  tags: Category[]
  tag: string
}

const Tags: NextPage<TagsInterface> = (props) => {
  const { posts = [], tags = [], tag } = props
  return (
    <>
      <Header
        title='鱼肚的博客'
        gitUrl='https://github.com/banyudu'
      />
      <div className='tags article'>
        <ButtonBox
          buttons={tags.map(item => ({
            name: item.name,
            badge: String(item.postCount),
            link: `/tag/${encodeURIComponent(item.name)}`
          }))}
          activeKey={tag}
        />
        <Posts posts={posts} />
      </div>
    </>
  )
}

Tags.getInitialProps = async ({ res, query }) => {
  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=1800, public') // 5 minutes
  }
  const tag = query.tag as string
  const postsRes: PostWithTimeline[] = await getPosts({ tag })
  const tags: Category[] = await getTags()
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
    tags,
    tag
  }
}

export default Tags

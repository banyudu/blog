import React, { FC } from 'react'
import Link from 'next/link'
import { Timeline } from 'antd'
import './index.less'
import { PostWithTimeline } from '../../types'

interface PostsProps{
  posts: PostWithTimeline[]
}

const Posts: FC<PostsProps> = (props) => {
  const { posts } = props
  if (!posts?.length) {
    return <></>
  }
  return (
    <Timeline mode='left' className='timeline'>
      {posts.map(post =>
        <Timeline.Item key={post.id} label={post.timeline ?? undefined}>
          <Link href={{ pathname: `/posts/${post.url}`, query: { random: process.env.random } }}>
            <a>{post.title}</a>
          </Link>
        </Timeline.Item>
      )}
    </Timeline>
  )
}

export default Posts

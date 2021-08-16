import React, { FC } from 'react'
import Link from 'next/link'
import { PostWithTimeline } from 'types'
import dayjs from 'dayjs'

interface PostsProps{
  posts: PostWithTimeline[]
}

const Posts: FC<PostsProps> = (props) => {
  const { posts } = props
  if (!posts?.length) {
    return <></>
  }
  return (
    <>
      {posts.map(post =>
        <article className='mb-12' key={post.id}>
          <Link href={{ pathname: `/posts/${post.url}`, query: { v: process.env.random } }}>
            <h3 className='text-2xl cursor-pointer'>{post.title}</h3>
          </Link>
          <small>{dayjs(post.createdAt).format('YYYY-MM-DD')}</small>
          <p>{post.extract}</p>
        </article>
      )}
    </>
  )
}

export default Posts

import React, { FC } from 'react'
import Link from 'next/link'
import { PostWithTimeline } from 'types'
import dayjs from 'dayjs'

interface PostsProps {
  posts: PostWithTimeline[]
}

const Posts: FC<PostsProps> = props => {
  const { posts } = props
  if (!posts?.length) {
    return <></>
  }
  return (
    <>
      {posts.map(post => (
        <Link
          href={{
            pathname: `/posts/${post.url}`,
            query: { v: process.env.random }
          }}
        >
          <article className='mb-12 flex flex-col md:flex-row' key={post.id}>
            <div
              className='p-2 w-full md:w-64 h-48'
            >
              <img
                className='h-full mx-auto'
                src={post.cover ?? '/assets/images/logo.png'}
                alt='Post Cover'
              />
            </div>
            <div className='ml-4'>
              <h2 className='text-2xl cursor-pointer'>{post.title}</h2>
              <small>{dayjs(post.createdAt).format('YYYY-MM-DD')}</small>
              <p>{post.extract}</p>
            </div>
          </article>
        </Link>
      ))}
    </>
  )
}

export default Posts

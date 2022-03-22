import React, { FC } from 'react'
import Link from 'next/link'
import { Post } from 'types'
import dayjs from 'dayjs'
import Image from 'next/image'

interface PostsProps {
  posts: Post[]
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
          key={post.id}
          href={{
            pathname: `/posts/${post.url}`,
            // query: { v: process.env.random }
          }}
          passHref
        >
          <article className='mb-8 md:mb-12 flex flex-col md:flex-row' key={post.id}>
            <div
              className='p-2 w-full md:w-1/4 relative h-48 md:h-auto'
            >
              <Image
                src={post.cover ?? '/assets/images/logo.png'}
                alt='Post Cover'
                layout='fill'
                objectFit='cover'
                width='100%'
                height='100%'
              />
            </div>
            <div className='ml-4 w-full md:w-2/3'>
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

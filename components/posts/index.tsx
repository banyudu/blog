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
          <article className='mb-12 flex flex-col md:flex-row' key={post.id}>
            <div
              className='p-2 w-48 h-48'
            >
              <Image
                className='h-full'
                src={post.cover ?? '/assets/images/logo.png'}
                alt='Post Cover'
                layout='responsive'
                width={240}
                height={176}
              />
            </div>
            <div className='ml-4'>
              <h2 className='text-2xl cursor-pointer'>{post.title}</h2>
              <small>{dayjs(post.createTime).format('YYYY-MM-DD')}</small>
              <p>{post.extract}</p>
            </div>
          </article>
        </Link>
      ))}
    </>
  )
}

export default Posts

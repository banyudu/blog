import React, { FC } from 'react'
import Link from 'next/link'
import { Post } from 'types'
import dayjs from 'dayjs'

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
          }}
          passHref
        >
          <article className='mb-8 md:mb-12 flex flex-col md:flex-row' key={post.id}>
            <div className='ml-4 w-full'>
              <h2 className='text-2xl cursor-pointer'>{post.title}</h2>
              <small>{dayjs(post.createdAt ?? post.createdOn).format('YYYY-MM-DD')}</small>
              <p>{post.extract}</p>
            </div>
          </article>
        </Link>
      ))}
    </>
  )
}

export default Posts

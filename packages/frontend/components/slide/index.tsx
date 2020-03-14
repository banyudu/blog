import React, { FC } from 'react'
import Link from 'next/link'
import { Post } from '../../types'
import './index.less'

interface SlideProps {
  post: Post
}

const Slide: FC<SlideProps> = (props) => {
  const { post } = props
  return (
    <div key={post.id} className='slide'>
      <h1>{post.title}</h1>
      <p>{post.extract}</p>
      <Link href={{ pathname: `/posts/${post.url}`, query: { random: process.env.random } }}>
        <div className='read-more'>
          <a>阅读更多</a>
        </div>
      </Link>
    </div>
  )
}

export default Slide

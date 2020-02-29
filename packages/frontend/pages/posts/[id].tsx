import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BackTop } from 'antd'
import './index.less'
// import Link from 'next/link'
import { NextPage } from 'next'
import Footer from '../../components/footer'
import Markdown from 'react-markdown'
import { rest } from '../../utils'
import CodeBlock from '../../components/codeblock'

interface PostProps {
  title: string
  content: string
  tags: string[]
  category: string
}

const Post: NextPage<PostProps> = (props) => {
  // const router = useRouter()
  const { title, tags, content } = props
  return (
    <div className='post'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={title} />
        <meta name='keywords' content={tags.join(' ')} />
        <meta name='robots' content='index,follow' />
        <meta name='google' content='index,follow' />
        <meta name='googlebot' content='index,follow' />
      </Head>
      <BackTop />
      <div className='headerbar'>
        <h2 className='title' title={title}>{title}</h2>
      </div>
      <hr />
      <article className='article'>
        <Markdown
          source={content}
          renderers={{ code: CodeBlock }}
        />
      </article>
      <hr />
      <Footer />
    </div>
  )
}

Post.getInitialProps = async function (ctx): Promise<PostProps> {
  const { id } = ctx.query
  const res = await rest.get(`/post/${id}`)

  // set cachec-control
  if (ctx.res) {
    ctx.res.setHeader('Cache-Control', 'max-age=86400, public')
  }

  // 将tags从字符串转成数组
  res.data.tags = (res.data.tags || '').split('|')

  return res.data
}

export default Post

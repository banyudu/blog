import React from 'react'
// import { useRouter } from 'next/router'
import Error from 'next/error'
import Head from 'next/head'
import { BackTop } from 'antd'
import './index.less'
import { NextPage } from 'next'
import Footer from '../../components/footer'
import Markdown from 'react-markdown'
import { rest } from '../../utils'
import CodeBlock from '../../components/codeblock'
import Logo from '../../components/logo'
import { useCookies } from 'react-cookie'
import { useProfile, useComments } from '../../hooks'
import Comments from '../../components/comments'
import { ErrorProps } from '../../types'

interface PostProps {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
}

const Post: NextPage<PostProps | ErrorProps> = (props) => {
  const { statusCode } = props as ErrorProps
  if (statusCode) {
    return <Error statusCode={statusCode} />
  }
  const { title, tags, content, id } = props as PostProps
  const [cookies] = useCookies(['token'])
  const [profile, profileLoading] = useProfile(cookies.token)
  const [comments, commentsLoading] = useComments(cookies.token, id)
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
        <Logo />
        <h2 className='title' title={title}>{title}</h2>
      </div>
      <article className='article'>
        <Markdown
          source={content}
          renderers={{ code: CodeBlock }}
        />
      </article>
      <hr />
      <Comments
        profile={profile}
        profileLoading={profileLoading}
        comments={comments}
        commentsLoading={commentsLoading}
        style={{ display: 'none' }}
      />
      <Footer />
    </div>
  )
}

Post.getInitialProps = async function ({ res, query }): Promise<PostProps | ErrorProps> {
  const { id } = query
  const postRes = await rest.get(`/post/${encodeURIComponent(decodeURIComponent(id as string))}`)
  if (!postRes.data) {
    if (res) {
      res.statusCode = 404
    }
    return { statusCode: 404 }
  }

  // set cachec-control
  if (res) {
    res.setHeader('Cache-Control', 'max-age=86400, public')
  }

  // 将tags从字符串转成数组
  postRes.data.tags = (postRes.data.tags || '').split('|')

  return postRes.data
}

export default Post

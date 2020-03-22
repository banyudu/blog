import React from 'react'
// import { useRouter } from 'next/router'
import Error from 'next/error'
import Head from 'next/head'
import { BackTop } from 'antd'
import { NextPage } from 'next'
import Footer from '../../components/footer'
import { rest } from '../../utils'
import Logo from '../../components/logo'
import { useComments } from '../../hooks'
import Comments from '../../components/comments'
import { ErrorProps, Profile } from '../../types'
import Markdown from '../../components/markdown'
import { addComment } from '../../services/comment'
import { login, logout } from '../../services/auth'
import cookies from 'next-cookies'
import * as _ from 'lodash'
import './index.less'

interface PostProps {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  debug?: boolean
  profile?: Profile
}

const Post: NextPage<PostProps | ErrorProps> = (props) => {
  const { statusCode } = props as ErrorProps
  if (statusCode) {
    return <Error statusCode={statusCode} />
  }
  const { title, tags, content, id, debug, profile = {} as any } = props as PostProps
  const [comments, commentsLoading] = useComments(profile.token, id)

  const commentsStyle = debug ? {} : { display: 'none' }
  console.log('commentsStyle is: ', JSON.stringify(commentsStyle))
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
      <BackTop visibilityHeight={800} />
      <div className='headerbar'>
        <Logo />
        <h2 className='title' title={title}>{title}</h2>
      </div>
      <article className='article'>
        <Markdown source={content} />
        <hr />
        <Comments
          profile={profile}
          profileLoading={false}
          comments={comments}
          commentsLoading={commentsLoading}
          style={commentsStyle}
          onAddComment={async (content) => addComment(profile.token, id, content)}
          login={login}
          logout={logout}
        />
      </article>
      <Footer />
    </div>
  )
}

Post.getInitialProps = async function (ctx): Promise<PostProps | ErrorProps> {
  const { query, res } = ctx
  const { id } = query
  const postRes = await rest.get(`/post/${encodeURIComponent(decodeURIComponent(id as string))}`)
  if (!postRes.data) {
    if (res) {
      res.statusCode = 404
    }
    return { statusCode: 404 }
  }

  // set cachec-control
  if (res && process.env.NODE_ENV === 'production') {
    res.setHeader('Cache-Control', 'max-age=86400, public')
  }

  // 将tags从字符串转成数组
  postRes.data.tags = (postRes.data.tags || '').split('|')

  const allCookies = cookies(ctx)
  const profile = allCookies.token ? _.pick(allCookies, ['userId', 'name', 'avatar']) : undefined
  const debug = !!allCookies.debug

  return {
    ...postRes.data,
    profile,
    debug
  }
}

export default Post

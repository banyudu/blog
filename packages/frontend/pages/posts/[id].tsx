import React, { useState, useRef, useEffect } from 'react'
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
import Summary from '../../components/summary'
import { addComment } from '../../services/comment'
import { login, logout } from '../../services/auth'
import cookies from 'next-cookies'
import * as _ from 'lodash'
import nanoid from 'nanoid'
import './index.less'

interface Auth extends Profile {
  token: string
}

interface PostProps {
  id: string
  title: string
  extract: string
  content: string
  tags: string[]
  category: string
  debug?: boolean
  profile?: Auth
  createdAt: Date
  updatedAt: Date
}

const Post: NextPage<PostProps | ErrorProps> = (props) => {
  const { statusCode } = props as ErrorProps
  if (statusCode) {
    return <Error statusCode={statusCode} />
  }
  const postProps = props as PostProps
  const { title, tags, content, id, category, extract, createdAt, updatedAt } = postProps
  const [commentsRefreshKey, setCommentsRefershKey] = useState<string>(nanoid())
  const [comments, commentsLoading] = useComments(id, commentsRefreshKey)
  const [profile, setProfile] = useState<Auth | undefined>(postProps.profile)
  // const router = useRouter()
  const token = profile?.token ?? ''
  const socialShareRef = useRef(null)

  useEffect(() => {
    // socialShareRef.current
  })

  const handleAddComment = async (content) => {
    await addComment(token, id, content)
    setCommentsRefershKey(nanoid())
  }

  return (
    <div className='post'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={extract} />
        <meta name='keywords' content={tags.join(' ')} />
        <meta name='robots' content='index,follow' />
        <meta name='google' content='index,follow' />
        <meta name='googlebot' content='index,follow' />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js' integrity='sha256-fGPu+icKh985TLPhO2v68U7i0CW0dE4kiR06RN4O6jo=' crossOrigin='anonymous' />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css' integrity='sha256-0EDwznjUTDEicOuZhOL03fpflUqzhkByvhwol8YGkp4=' crossOrigin='anonymous' />
      </Head>
      <BackTop visibilityHeight={1500} />
      <div className='headerbar'>
        <Logo />
        <h2 className='title' title={title}>{title}</h2>
      </div>
      <article className='article'>
        <Summary
          category={category}
          tags={tags}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
        <Markdown source={content} />
        <hr />
        <div ref={socialShareRef} className='social-share' />
        <Comments
          profile={profile}
          profileLoading={false}
          comments={comments}
          commentsLoading={commentsLoading}
          onAddComment={handleAddComment}
          login={() => login((profile) => {
            console.debug('login callback')
            console.debug('newProfile is: ', profile)
            setProfile(profile)
          })}
          logout={async () => logout(() => setProfile(undefined))}
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
  const profile = allCookies.token ? _.pick(allCookies, ['userId', 'name', 'avatar', 'token']) : undefined
  const debug = !!allCookies.debug

  return {
    ...postRes.data,
    createdAt: new Date(postRes.data.createdAt),
    updatedAt: new Date(postRes.data.updatedAt),
    profile,
    debug
  }
}

export default Post

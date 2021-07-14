import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Head from 'next/head'
import { BackTop, Spin } from 'antd'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Footer from '../../components/footer'
import { rest } from '../../utils'
import { useComments } from '../../hooks'
import Comments from '../../components/comments'
import { ErrorProps, Profile } from '../../types'
import Markdown from '../../components/markdown'
import Summary from '../../components/summary'
import { addComment } from '../../services/comment'
import { getPosts } from '../../services/post'
import { login, logout } from '../../services/auth'
import Cookies from 'js-cookie'
// import cookies from 'next-cookies'
// import * as _ from 'lodash'
import nanoid from 'nanoid'
import { useRouter } from 'next/router'
import ShareButtons from '../../components/share-buttons'
import './index.less'
import FollowMe from '../../components/follow-me'
import Header from '../../components/header'

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
  // debug?: boolean
  // profile?: Auth
  url: string
  createdAt: string
  updatedAt: string
}

const Post: NextPage<PostProps | ErrorProps> = (props) => {
  const { statusCode } = props as ErrorProps
  const { title, tags, content, id, category, extract, createdAt, updatedAt } = props as PostProps
  if (statusCode) {
    return <Error statusCode={statusCode} />
  }
  if (!id) {
    return <div className='app-loading'><Spin /></div>
  }
  const [commentsRefreshKey, setCommentsRefershKey] = useState<string>(nanoid())
  const [comments, commentsLoading] = useComments(id, commentsRefreshKey)
  const [profile, setProfile] = useState<Auth | undefined>(undefined)
  const router = useRouter()
  const token = profile?.token ?? ''

  useEffect(() => {
    // socialShareRef.current
    setProfile({
      userId: Cookies.get('userId'),
      name: Cookies.get('name') ?? '',
      avatar: Cookies.get('avatar') ?? '',
      token: Cookies.get('token') ?? ''
    })
  }, [])

  const handleAddComment = async (content) => {
    await addComment(token, id, content)
    setCommentsRefershKey(nanoid())
  }

  const HOST = 'https://banyudu.com'

  let gistId = ''
  if (/^gist:.+$/.test(id)) {
    gistId = id.substr('gist:'.length)
  }

  // 解决series中url错误的问题
  gistId = (gistId ?? '').split(':')[0]

  return (
    <div className='post'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={extract} />
        <meta name='keywords' content={tags.join(' ')} />
        <meta name='robots' content='index,follow' />
        <meta name='google' content='index,follow' />
        <meta name='googlebot' content='index,follow' />
        <meta property='og:title' content={title} />
        <meta property='og:type' content='article' />
        <meta property='og:description' content={extract} />
        <meta property='og:locale' content='zh_CN' />
        <meta property='og:site_name' content='鱼肚的博客' />
        <meta property='og:image' content='https://banyudu.com/assets/images/logo.png' />
        <meta property='og:url' content={HOST + router.asPath} />
      </Head>
      <BackTop visibilityHeight={1500} />
      <Header
        title={title}
        gitUrl={`https://gist.github.com/banyudu/${gistId}`}
      />
      <article className='article'>
        <Summary
          category={category}
          tags={tags}
          createdAt={new Date(createdAt)}
          updatedAt={new Date(updatedAt)}
        />
        <div className='content-and-share'>
          <Markdown source={content} className='post' />
          <ShareButtons
            title={title}
            description={extract}
            image=''
            url={HOST + router.asPath}
            origin={HOST}
            site={HOST}
          />
        </div>
        <FollowMe /> <br />
        <hr />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const result = {
    // paths: [ { params: { } } ],
    paths: posts.map(post => {
      return {
        params: { id: post.url }
      }
    }),
    fallback: true
  }
  return result
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const { id } = params as any
  const postRes = await rest.get(`/post/${encodeURIComponent(decodeURIComponent(id as string))}`)

  // 将tags从字符串转成数组
  const props = postRes.data || {}
  if (!Array.isArray(props.tags)) {
    props.tags = (props.tags || '').split(/[\s|,]+/)
  }

  // Pass post data to the page via props
  return {
    props
  }
}

export default Post

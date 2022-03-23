import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { ErrorProps } from 'types'
import Markdown from 'components/markdown'
import Summary from 'components/summary'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import { usePost } from 'hooks'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import GitalkComponent from 'gitalk/dist/gitalk-component'

interface PostProps {
  id: string
  title: string
  extract: string
  cover?: string
  content: string
  tags: string[]
  category: string
  url: string
  createdAt: string
}

const Post: NextPage<PostProps | ErrorProps> = () => {
  const router = useRouter()
  const { post, loading } = usePost(router.query.id as string)
  if (loading) {
    return (
      <div className='app-loading'>
        <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24' />
      </div>
    )
  }
  const {
    title,
    content,
    id,
    category,
    extract,
    cover,
    createdAt,
    createdOn,
    savedOn
  } = post ?? {}

  const HOST = 'https://banyudu.com'

  let realCover = cover
  if (!realCover) {
    // 尝试从文章中找到第一张图片
    const match = content?.match(
      /!\[[^\]]*\]\((?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/
    )
    if (match?.groups?.filename) {
      realCover = match.groups.filename
    }
  }
  realCover = realCover ?? 'https://banyudu.com/assets/images/logo.png'

  return (
    <div>
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name='description' content={extract} />
          {/* <meta name='keywords' content={tags.join(' ')} /> */}
          <meta name='robots' content='index,follow' />
          <meta name='google' content='index,follow' />
          <meta name='googlebot' content='index,follow' />
          <meta property='og:title' content={title} />
          <meta property='og:type' content='article' />
          <meta property='og:description' content={extract} />
          <meta property='og:locale' content='zh_CN' />
          <meta property='og:site_name' content='鱼肚的博客' />
          <meta property='og:image' content={realCover} />
          <meta property='og:url' content={HOST + router.asPath} />

          {/* twitter 分享卡片信息 */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@banyudu' />
          <meta name='twitter:creator' content='@banyudu' />
          <meta name='twitter:title' content={title} />
          <meta name='twitter:description' content={extract} />
          <meta name='twitter:image' content={realCover} />
        </Head>
        <aside className='mb-2 text-sm'>
          <Summary
            category={category?.name ?? ''}
            tags={[]}
            createdAt={new Date(createdAt ?? createdOn ?? new Date())}
            updatedAt={new Date(savedOn ?? new Date())}
          />
        </aside>
        <article className='break-all'>
          <div>
            <Markdown source={content ?? ''} />
          </div>
        </article>
      </Layout>
      <div className='comments md:mx-auto px-4 py-8 max-w-4xl lg:max-w-5xl'>
        <GitalkComponent
          options={{
            clientID: '8d0a2ddcd61c65c4d22f',
            clientSecret: '4b9d2bb239a7a13e93c6c394e9560c274b36c945',
            repo: 'blog-comments',
            owner: 'banyudu',
            admin: ['banyudu'],
            id: (router.query.id as string ?? location.href)?.substring(0, 45),
            distractionFreeMode: false
          }}
        />
      </div>
    </div>
  )
}

export default Post

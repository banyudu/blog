import React from 'react'
import Error from 'next/error'
import Head from 'next/head'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { rest } from 'utils'
import { ErrorProps } from 'types'
import Markdown from 'components/markdown'
import Summary from 'components/summary'
import { getPosts } from 'services/post'
import { useRouter } from 'next/router'
import Layout from 'components/layout'

interface PostProps {
  id: string
  title: string
  extract: string
  content: string
  tags: string[]
  category: string
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
    return <div className='app-loading'><svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24' /></div>
  }
  const router = useRouter()

  const HOST = 'https://banyudu.com'

  return (
    <Layout>
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
      <aside className='mb-8'>
        <Summary
          category={category}
          tags={tags}
          createdAt={new Date(createdAt)}
          updatedAt={new Date(updatedAt)}
        />
      </aside>
      <article>
        <div>
          <Markdown source={content} />
        </div>
      </article>
    </Layout>
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

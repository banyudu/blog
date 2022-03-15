import React from 'react'
import Head from 'next/head'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { ErrorProps } from 'types'
import Markdown from 'components/markdown'
import Summary from 'components/summary'
import { getPost, getPosts } from 'services/graph'
import { useRouter } from 'next/router'
import Layout from 'components/layout'

interface PostProps {
  id: string
  title: string
  extract: string
  cover?: string
  content: string
  tags: string[]
  category: string
  url: string
  createTime: string
  updateTime: string
}

const Post: NextPage<PostProps | ErrorProps> = (props) => {
  console.log(props)
  const { title, tags = [], content, id, category, extract, cover, createTime, updateTime } = props as PostProps
  const router = useRouter()
  if (!id) {
    return <div className='app-loading'><svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24' /></div>
  }

  const HOST = 'https://banyudu.com'

  let realCover = cover
  if (!realCover) {
    // 尝试从文章中找到第一张图片
    const match = content?.match(/!\[[^\]]*\]\((?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/)
    if (match?.groups?.filename) {
      realCover = match.groups.filename
    }
  }
  realCover = realCover ?? 'https://banyudu.com/assets/images/logo.png'

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
        <meta property='og:image' content={realCover} />
        <meta property='og:url' content={HOST + router.asPath} />

        {/* twitter 分享卡片信息 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@banyudu" />
        <meta name="twitter:creator" content="@banyudu" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={extract} />
        <meta name="twitter:image" content={realCover} />
      </Head>
      <aside className='mb-2 text-sm'>
        <Summary
          category={category}
          tags={tags}
          createdAt={new Date(createTime)}
          updatedAt={new Date(updateTime)}
        />
      </aside>
      <article className='break-all'>
        <div>
          <Markdown source={content} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const ids = posts.map((post) => post.id)
  const result = {
    paths: ids.map(id => ({ params: { id } })),
    fallback: true
  }
  return result
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const { id } = params as any
  const postRes = await getPost(id)

  // Pass post data to the page via props
  return {
    props: postRes || {}
  }
}

export default Post

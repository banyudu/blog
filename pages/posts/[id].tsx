import React from 'react'
import Head from 'next/head'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Markdown from 'components/markdown'
import Summary from 'components/summary'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import { usePost } from 'hooks'
import GitalkComponent from 'components/gitalk'
import md5 from 'md5'
import { getPost, getPosts } from 'services/graph'

interface PostProps {
  post: any
}

const Post: NextPage<PostProps> = ({ post: staticPost }) => {
  const router = useRouter()
  const { post, loading } = usePost(router.query.id as string)
  if (loading && !staticPost) {
    return (
      <div className='app-loading dark:text-white dark:bg-slate-900'>
        <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24' />
      </div>
    )
  }
  const {
    title,
    content,
    category,
    extract,
    cover,
    createdAt,
    createdOn,
    savedOn
  } = post ?? staticPost ?? {}

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
    <div className='dark:text-white dark:bg-slate-900'>
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
      <div className='comments dark:text-white dark:bg-slate-900 md:mx-auto px-4 py-8 max-w-4xl lg:max-w-5xl'>
        <GitalkComponent
          options={{
            clientID: '8d0a2ddcd61c65c4d22f',
            clientSecret: '4b9d2bb239a7a13e93c6c394e9560c274b36c945',
            repo: 'blog-comments',
            owner: 'banyudu',
            admin: ['banyudu'],
            id: md5(router.query.id as string ?? location.href),
            distractionFreeMode: false,
            title
          }}
        />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  return {
    fallback: true,
    paths: posts.map(e => ({ params: { id: e.url } })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.id as string)
  return {
    props: {
      post
    },
  };
};

export default Post

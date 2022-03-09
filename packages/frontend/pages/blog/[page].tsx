import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getPosts } from 'services/post'
import dayjs from 'dayjs'
import { PostWithTimeline } from 'types'
import Posts from 'components/posts'
import Layout from 'components/layout'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@emmda-design/icons'
import { useRouter } from 'next/router'

// 每页文章数量
const pageSize = 10

interface BlogProps {
  posts: PostWithTimeline[]
  page: number
  pageCount: number
}

const Blog: NextPage<BlogProps> = ({ posts, page, pageCount }) => {
  const router = useRouter()
  const iconClass = 'bg-gray-300 dark:bg-gray-700'
  const go = async (pageNo: number) => {
    pageNo = Math.min(pageCount, Math.max(1, pageNo))
    await router.push(`/blog/${pageNo}`)
  }

  return (
    <Layout>
      <main>
        <Posts posts={posts} />
        <div className='pagination flex justify-between'>
          <button className={iconClass} onClick={async () => await go(page - 1)} disabled={page === 1}>
            <ChevronLeftOutlined />
          </button>
          <span>{page} / {pageCount}</span>
          <button className={iconClass} onClick={async () => await go(page + 1)} disabled={page === pageCount}>
            <ChevronRightOutlined />
          </button>
        </div>
      </main>
    </Layout>
  )
}

async function getPostsWithTimeline (page: string) {
  const realPage = Number(page) || 1
  // set cachec-control
  const postsRes: PostWithTimeline[] = await getPosts()
  let lastTimeline = ''
  for (const post of postsRes) {
    const timeline = dayjs(post.createdAt).format('YYYY-MM')
    if (lastTimeline !== timeline) {
      post.timeline = timeline
      lastTimeline = timeline
    }
  }
  const pageCount = Math.ceil(postsRes.length / pageSize)
  const posts = postsRes.splice(pageSize * (realPage - 1), pageSize)
  return {
    page: realPage,
    pageCount,
    posts
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const pageCount = Math.ceil(posts.length / 10)
  const pageNums = Array.from(Array(pageCount).keys()).map(e => String(e + 1))
  const result = {
    paths: pageNums.map(page => ({ params: { page } })),
    fallback: true
  }
  return result
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { posts, page, pageCount } = await getPostsWithTimeline(params?.page as string)
  return {
    props: { posts, page, pageCount }
  }
}

export default Blog

import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { PostWithTimeline } from 'types'
import Layout from 'components/layout'

interface AppInterface {
  posts: PostWithTimeline[]
}

const App: NextPage<AppInterface> = ({ posts }) => {
  const router = useRouter()
  useEffect(() => {
    router.push('/blog/1').catch(console.error)
  }, [])
  return (
    <Layout>
      <Head>
        <title>🐠鱼肚的博客</title>
      </Head>
      <div />
    </Layout>
  )
}

export default App

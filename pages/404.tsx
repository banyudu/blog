'use client'

import React, { useEffect } from 'react'
import Layout from 'components/layout'
import { useRouter } from 'next/router'

export default function Custom404 () {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 300);
  }, [router])
  return (
    <Layout title='404 Not Found'>
      <h1>404 Not Found</h1>

      <p>
        Redirecting to home page...
      </p>
    </Layout>
  )
}

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const App: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/blog/1').catch(console.error)
  }, [])
  return null
}

export default App

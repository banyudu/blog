import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const App: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/blog').catch(console.error)
  }, [router])
  return null
}

export default App

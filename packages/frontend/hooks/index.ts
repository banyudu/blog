import { useEffect, useState } from 'react'
import { rest } from '../utils'
import { getComments } from '../services/comment'
import { Profile, Comment } from '../types'

export const useProfile = (token: string): [Profile | undefined, boolean] => {
  const [profile, setProfile] = useState<Profile | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const profileRes = await rest.get('/profile', {
            headers: {
              Authorization: token
            }
          })
          setProfile(profileRes.data)
        }
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })().catch(console.error)
  }, [token])
  return [profile, loading]
}

export const useComments = (token: string, postId: string): [Comment[], boolean] => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      try {
        const comments = await getComments(postId)
        setComments(comments)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })().catch(console.error)
  }, [token])
  return [comments, loading]
}

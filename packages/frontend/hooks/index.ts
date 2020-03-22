import { useEffect, useState } from 'react'
import { getComments } from '../services/comment'
import { Profile, Comment } from '../types'
import { getProfile } from '../services/auth'

export const useProfile = (token: string): [Profile | undefined, boolean] => {
  const [profile, setProfile] = useState<Profile | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const profileData = await getProfile(token)
          setProfile(profileData)
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
        if (token && postId) {
          const comments = await getComments(postId)
          setComments(comments)
        }
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })().catch(console.error)
  }, [token])
  return [comments, loading]
}

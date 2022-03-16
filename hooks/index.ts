import { useEffect, useState } from 'react'
import { getComments } from 'services/comment'
import { Profile, Comment } from 'types'
import { getProfile } from 'services/auth'
import { getPosts, getPost } from 'services/graph'
import useSWR from 'swr'

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

export const useComments = (postId: string, refreshKey: string = ''): [Comment[], boolean] => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      try {
        if (postId) {
          const comments = await getComments(postId)
          setComments(comments)
        }
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })().catch(console.error)
  }, [postId, refreshKey])
  return [comments, loading]
}

export const usePosts = () => {
  const { data: posts = [], error, isValidating } = useSWR('posts', getPosts)
  return { posts, error, loading: isValidating && !posts?.length }
}

export const usePost = (id: string) => {
  const { data: post, error, isValidating } = useSWR([id, 'post'], getPost, {
    revalidateOnFocus: false,
  })
  return { post, loading: !post && isValidating, error }
}

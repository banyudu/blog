import { useEffect, useState } from 'react'
import { getComments } from '../services/comment'
import { Profile, Comment } from '../types'
import { getProfile } from '../services/auth'
import { getPosts, getPost } from '../services/graph'

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
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts()
        setPosts(posts)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })().catch(console.error)
  }, [])
  return { posts, loading }
}

export const usePost = (id: string) => {
  const [post, setPost] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(id)
        setPost(post)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })().catch(console.error)
  }, [id])
  return { post, loading }
}

import { getPosts, getPost } from 'services/graph'
import useSWR from 'swr'

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

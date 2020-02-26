import { rest } from '../utils'
import { AxiosResponse } from 'axios'

interface getPostsParams {
  page?: number
  pageSize?: number
}

export const getPosts = async (options: getPostsParams = {}): Promise<PostsRes> => {
  const res: AxiosResponse<PostsRes> = await rest.get('/posts', { params: options })
  return res.data
}

export const getPost = async (id: string): Promise<Post | undefined> => {
  const res: AxiosResponse<Post | undefined> = await rest.get(`/post/${id}`)
  return res.data
}

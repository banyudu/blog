import { rest } from '../utils'
import { AxiosResponse } from 'axios'
import { Comment } from '../types'

const DEFAULT_COMMENTS_API = 'https://api.banyudu.com/comments'

const COMMENTS_API = process.env.COMMENTS_API ?? DEFAULT_COMMENTS_API

export const getComments = async (postId: string): Promise<Comment[]> => {
  const entity = `blog:${postId}`
  const res: AxiosResponse<Comment[]> = await rest.get(`${COMMENTS_API}/comments`, {
    params: { entity }
  })
  console.log('response in getComments: ', res.data)
  return res.data
}

export const addComment = async (token, postId: string, content: string): Promise<Comment[]> => {
  const entity = `blog:${postId}`
  const res: AxiosResponse<Comment[]> = await rest.post(
    `${COMMENTS_API}/comment`,
    { entity, content },
    { headers: { Authorization: token } }
  )
  return res.data
}

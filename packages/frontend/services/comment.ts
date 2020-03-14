import { rest } from '../utils'
import { AxiosResponse } from 'axios'
import { Comment } from '../types'

const DEFAULT_COMMENTS_API = 'https://api.banyudu.com/comments'

const COMMENTS_API = process.env.COMMENTS_API ?? DEFAULT_COMMENTS_API

interface getCommentsParams {
  entity: string
  page?: number
  pageSize?: number
}

export const getComments = async (options: getCommentsParams): Promise<Comment[]> => {
  const res: AxiosResponse<Comment[]> = await rest.get(`${COMMENTS_API}/comments`, { params: options })
  return res.data
}

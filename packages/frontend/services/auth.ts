import { rest } from '../utils'
import { AxiosResponse } from 'axios'
import { Profile } from '../types'

const DEFAULT_AUTH_API = 'https://api.banyudu.com/auth'

const AUTH_API = process.env.COMMENTS_API ?? DEFAULT_AUTH_API

export const getProfile = async (token: string): Promise<Profile> => {
  const res: AxiosResponse<Profile> = await rest.get(`${AUTH_API}/profile`, {
    headers: { Authorization: token }
  })
  return res.data
}

export const login = () => {
  // TODO: implement this function
}

export const logout = () => {
  // TODO: remove the cookie
}

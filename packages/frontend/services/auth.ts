import { rest } from '../utils'
import { AxiosResponse } from 'axios'
import { Profile } from '../types'
import * as Cookies from 'js-cookie'

const DEFAULT_AUTH_API = 'https://api.banyudu.com/auth'
const AUTH_API = process.env.COMMENTS_API ?? DEFAULT_AUTH_API

const GITHUB_AUTH_PAGE = 'https://auth.banyudu.com/github'

export const getProfile = async (token: string): Promise<Profile> => {
  const res: AxiosResponse<Profile> = await rest.get(`${AUTH_API}/profile`, {
    headers: { Authorization: token }
  })
  return res.data
}

export const login = (callback?: Function) => {
  const width = 600
  const height = 450
  const x = (window.innerWidth - width) / 2
  const y = (window.innerHeight - height) / 2

  const newWindow = window.open('about:blank', 'Auth', `directories=0,titlebar=0,toolbar=0,location=0,
    status=0,menubar=0,scrollbars=no,resizable=no,width=${width},height=${height},top=${y},left=${x}`)
  if (newWindow) {
    newWindow.addEventListener('authComplete', (profile) => { callback?.(profile) }, { once: true })
    newWindow.location.href = GITHUB_AUTH_PAGE
  }
}

export const logout = async (callback) => {
  console.log('logging out..')
  // await rest.post(`${AUTH_API}/logout`) // 修改为在客户端删除cookie
  Cookies.remove('token', { path: '/', domain: 'banyudu.com' })
  callback?.()
}

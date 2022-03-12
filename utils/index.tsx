import axios from 'axios'
import Debug from 'debug'
import { NextApiRequest, NextApiResponse } from 'next'

export const debug = Debug('blog')

const DEFAULT_API = 'https://api.banyudu.com/blog'
export const rest = axios.create({
  baseURL: process.env.API ?? DEFAULT_API
})

rest.interceptors.response.use(res => {
  const { code, data, err } = res.data
  if (code) { // code不为0即报错
    throw new Error(`Error(${code}):\n${err}`)
  }
  res.data = data
  return res
}, err => {
  console.log('rest error: ', err)
  throw err
})

export const run = (controller) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await controller(req, res)
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(200).end()
    }
  } catch (err: any) {
    debug('run error: ', err)
    res.status(500).json({
      code: 500,
      err: err.message
    })
  }
}

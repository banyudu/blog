import axios from 'axios'

const DEFAULT_API = 'https://api.banyudu.com/blog'
console.log('baseurl: ', process.env.API || DEFAULT_API)
export const rest = axios.create({
  baseURL: process.env.API || DEFAULT_API
})

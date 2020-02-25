import axios from 'axios'

export const rest = axios.create({
  baseURL: 'https://api.banyudu.com/blog'
})

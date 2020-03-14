declare module 'next-ga'
declare module '*.svg'

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
}

interface Post {
  id: string
  title: string
  url: string
  extract: string
  content?: string
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface PostsRes extends Pagination {
  posts: Post[]
}

interface ErrorProps {
  statusCode: number
  error?: string
}

interface Profile {
  name: string
  avatar: string
  email: string
}

interface Comment {
  author: {
    id: string
    name: string
    avatar: string
  }
  id: string
  entity: string
  refId?: string
  content: string
  createdAt: string
  updatedAt: string
}

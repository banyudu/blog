declare module 'next-ga'

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
}

interface Post {
  id: string
  title: string
  extract: string
  content: string
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface PostsRes extends Pagination {
  posts: Post[]
}

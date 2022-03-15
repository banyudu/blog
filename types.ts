export interface AnyObject<T = any> { [x: string]: T }
export type StringObject = AnyObject<string>
export type NumberObject = AnyObject<number>

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
}

export interface Post {
  id: string
  title: string
  url: string
  cover: string
  extract: string
  content?: string
  category: string
  tags: string[]
  createdTime: Date
  updatedTime: Date
}

export interface PostsRes extends Pagination {
  posts: Post[]
}

export interface ErrorProps {
  statusCode: number
  error?: string
}

export interface Profile {
  name: string
  avatar: string
  email?: string
  userId?: string
}

export interface Comment {
  author: {
    id: string
    name: string
    avatar: string
  }
  id: string
  entity: string
  refId?: string
  content: string
  createdAt: Date
  updatedAt: Date
  children?: Comment[]
}

export interface PostWithTimeline extends Post {
  timeline?: string
}

export interface CategoryOrTag {
  name: string
  postCount: number
}

export type Category = CategoryOrTag
export type Tag = CategoryOrTag

export interface ButtonAttributes {
  name: string
  badge: string
  link?: string
}

export interface GistFile {
  id: string
  title: string
  filename: string
  url: string
  content?: string
  series?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface SeriesPost {
  id: string
  filename: string
  rawUrl: string
}

export interface GistSeries {
  id: string
  title: string
  files: GistFile[]
  createdAt?: Date
  updatedAt?: Date
}

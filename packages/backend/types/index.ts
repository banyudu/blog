export interface AnyObject<T = any> { [x: string]: T }
export type StringObject = AnyObject<string>
export type NumberObject = AnyObject<number>

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

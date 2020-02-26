export interface AnyObject<T> { [x: string]: T }
export type StringObject = AnyObject<string>
export type NumberObject = AnyObject<number>

export interface Gist {
  id: string
  title: string
  filename: string
  url: string
  createdAt: Date
  updatedAt: Date
}

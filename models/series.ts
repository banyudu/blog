import * as dynamoose from 'dynamoose'
import { gen } from './base'

export interface Series {
  id: string
  title: string
  url: string
  posts: string
  updatedAt: Date
  createdAt: Date
}

export const Schema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
    hashKey: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    index: {
      name: 'urlGSI',
      global: true
    }
  },
  posts: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default gen(process.env.SERIES_TABLE!, Schema)
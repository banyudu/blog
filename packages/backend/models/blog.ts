import * as dynamoose from 'dynamoose'

export interface Blog {
  id: string
  category: string
  title: string
  extract: string
  tags: string
  content: string
  url: string
  filename: string
  updatedAt: Date
  createdAt: Date
}

export const Schema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
    hashKey: true
  },
  category: String,
  title: {
    type: String,
    required: true
  },
  tags: String,
  extract: String,
  content: {
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
  filename: String,
  series: {
    type: String,
    required: false,
    index: {
      name: 'seriesGSI',
      global: true
    }
  }
}, {
  timestamps: true
})

export default dynamoose.model<Blog, string>(process.env.TABLE, Schema)

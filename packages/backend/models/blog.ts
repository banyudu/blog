import * as dynamoose from 'dynamoose'

export const Schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  category: {
    type: String,
    rangeKey: true
  },
  extract: String,
  content: String,
  url: String,
  filename: String,
}, {
  timestamps: true,
})

export default dynamoose.model(process.env.TABLE, Schema)

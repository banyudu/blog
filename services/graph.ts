import { Post } from '../types'
import { request, gql } from 'graphql-request'

const headers = {
  Authorization: process.env.NEXT_PUBLIC_CMS_READ_TOKEN ?? ''
}

const graphqlEndpoint = 'https://cmsapi.banyudu.com/cms/read/zh-Hans-CN'

const qryGetBlogPosts = gql`
{
  listBlogPosts(where: {}, sort: [createTime_DESC], limit: 10000) {
    data {
      id,
      title,
      content,
      cover,
      category {
        id
      },
      extract,
      createTime,
      updateTime
    }
  }
}
`

const qryGetPost = gql`
query getPost ($id: ID) {
  getBlogPost(where: { id: $id }) {
    data {
      id,
      title,
      cover,
      extract,
      category {
        name
      },
      createTime,
      updateTime,
      content
    },
    error {
      message
    }
  }
}`


export const getPosts = async (): Promise<Post[]> => {
  const cmsPosts = (await request(graphqlEndpoint, qryGetBlogPosts, {}, headers)).listBlogPosts.data || []
  return cmsPosts
}

export const getPost = async (id: string): Promise<Post | undefined> => {
  const post = (await request(graphqlEndpoint, qryGetPost, { id }, headers)).getBlogPost.data
  return post
}

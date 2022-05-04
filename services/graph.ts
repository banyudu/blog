import { Post } from '../types'
import { request, gql } from 'graphql-request'

const headers = {
  Authorization: process.env.NEXT_PUBLIC_CMS_READ_TOKEN ?? ''
}

const graphqlEndpoint = 'https://cmsapi.banyudu.com/cms/read/zh-Hans-CN'

const qryGetBlogPosts = gql`
{
  listBlogPosts(where: {}, sort: [createdAt_DESC], limit: 10000) {
    data {
      id,
      title,
      url,
      cover,
      extract,
      createdAt
    }
  }
}
`

const qryGetPost = gql`
query getPost ($id: String) {
  getBlogPost(where: { url: $id }) {
    data {
      id,
      title,
      cover,
      url,
      extract,
      createdAt,
      content,
      createdOn,
      savedOn
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

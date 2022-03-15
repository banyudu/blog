const { request, gql } = require('graphql-request')
const axios = require('axios')
const _ = require('lodash')

const updateBlogPostQuery = gql`
mutation UpdateBlogPost($revision: ID!, $data: BlogPostInput!) {
  createBlogPostFrom(revision: $revision, data: $data) {
		data {
      id,
    },
    error {
      message
    }
  }
}
`

const getBlogPosts = gql`
{
  listBlogPosts(where: {}, sort: [createdOn_DESC], limit: 100) {
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

const headers = {
  Authorization: process.env.WEBINY_TOKEN
}

const graphqlEndpoint = 'https://cmsapi.banyudu.com/cms/manage/zh-Hans-CN'

const sync = async () => {
  const posts = (await axios.get('https://api.banyudu.com/blog/posts')).data?.data ?? []
  const cmsPosts = (await request(graphqlEndpoint, getBlogPosts, {}, headers)).listBlogPosts.data || []
  const postMap = _.keyBy(posts, 'title')
  for (const post of cmsPosts) {
    if (!post.id.endsWith('#0001')) {
      continue
    }
    const postData = postMap[post.title]
    console.log({
      revision: post.id,
      createTime: postData.createdAt,
      updateTime: postData.updatedAt
    })
    await request(graphqlEndpoint, updateBlogPostQuery, {
      revision: post.id,
      data: {
        title: post.title,
        extract: post.extract,
        content: post.content,
        cover: post.cover ?? '',
        category: {
          id: post.category.id,
          modelId: 'category'
        },
        createTime: postData.createdAt,
        updateTime: postData.updatedAt
      }
    }, headers)
  }
}

sync().catch(console.error)

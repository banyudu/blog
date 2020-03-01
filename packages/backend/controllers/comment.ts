import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'

export const getComments: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: [
        {
          id: '1c5b2477-3a9c-46ff-b583-99e32a5c0c3f',
          author: {
            name: '小明',
            avatar: 'http://b-ssl.duitang.com/uploads/item/201703/26/20170326161532_aGteC.jpeg'
          },
          content: '这篇文章讲得真不错，谢谢分享！',
          createdAt: '2020-02-29T00:00:00Z',
          updatedAt: '2020-02-29T00:00:00Z'
        },
        {
          id: 'fd987ffe-29e5-4286-b5f0-f6a3f1ba39bf',
          author: {
            name: '小强',
            avatar: 'http://b-ssl.duitang.com/uploads/item/201412/13/20141213220212_rLVdL.jpeg'
          },
          content: '文中第二段有问题，大小写格式不正确',
          createdAt: '2020-02-28T03:00:00Z',
          updatedAt: '2020-02-29T10:00:00Z'
        }
      ]
    })
  }
})

export const addComment: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: 'success'
    })
  }
})

import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'

export const getPosts: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      data: 'success'
    })
  }
})

export const getPost: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      data: 'success'
    })
  }
})

export const syncPost: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      data: 'success'
    })
  }
})

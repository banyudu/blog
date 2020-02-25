import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'

export const getComments: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      data: 'success'
    })
  }
})

export const addComment: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      data: 'success'
    })
  }
})

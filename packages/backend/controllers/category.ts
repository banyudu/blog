import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'

export const getCategories: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: [
        { name: 'Serverless', blogCount: 100 },
        { name: 'Git', blogCount: 50 },
        { name: 'NodeJS', blogCount: 80 }
      ]
    })
  }
})

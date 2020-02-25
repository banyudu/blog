import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'

export const getTags: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      data: [
        { name: 'Serverless', blogCount: 100 },
        { name: 'Git', blogCount: 50 },
        { name: 'NodeJS', blogCount: 80 }
      ]
    })
  }
})

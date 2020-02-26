import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import { getGists as fetchGists } from '../services/gist'

export const getGists: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const gists = await fetchGists()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: gists
    })
  }
})

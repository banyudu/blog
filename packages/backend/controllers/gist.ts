import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import { getGists as fetchGists } from '../services/gist'
import Blog from '../models/blog'

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


export const syncGists: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const gists = await fetchGists()
  // TODO: filter by database
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: gists
    })
  }
})


import { run } from '../../../utils'
import { getGists as fetchGists } from '../../../services/gist'
import { NextApiRequest, NextApiResponse } from 'next'

const getGists = run(async (req: NextApiRequest, res: NextApiResponse) => {
  const [, gists] = await fetchGists()
  res.status(200).json({
    code: 0,
    data: gists
  })
})

export default getGists

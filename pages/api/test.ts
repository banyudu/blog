import { NextApiRequest, NextApiResponse } from "next";
import { run } from "utils";

export default run((req: NextApiRequest, res: NextApiResponse) => {
  return {
    code: 0,
    data: []
  }
})

import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from './[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse, a) => {
  if (req.method !== 'GET') {
    return res.status(400).json({
      message: 'Invalid method.',
    });
  }

  const { user } = await getUser(req, res);
  return res.send(user);
};

export default handler;

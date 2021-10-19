import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const Key = 'FIUGHSDFOIGJSDGIOFDJGIOJSFDKGJSDFGHJSDFHGIKFSHDSDFUIOGHSDFGIFDG';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(400).json({ err: 'Methodo inexistente' });
  }
  const authToken = req.headers.authorization;
  if (authToken !== undefined) {
    const bearer = authToken.split(' ');
    const auth = bearer[1];
    jwt.verify(auth, Key, (err, data) => {
      if (err) {
        res.status(401).json({ err: 'Nao autorizado' });
      } else {
        res.status(200).json({ id: data.id, email: data.email });
      }
    });
  }
};

export default handler;

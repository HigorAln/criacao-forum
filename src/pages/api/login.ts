// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const Key = 'FIUGHSDFOIGJSDGIOFDJGIOJSFDKGJSDFGHJSDFHGIKFSHDSDFUIOGHSDFGIFDG';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST') {
    res.status(400).json({ err: 'Method not exist' });
  }
  const { email, password } = req.body;

  if (email !== undefined) {
    if (password !== undefined) {
      const mail = String(email);
      // const mail = Info1.replace(/[^a-z0-9-_.]/gi, '');
      const pass = String(password);
      // const pass = Info2.replace(/[^a-z0-9-_.@#!]/gi, '');

      const responseEmail = await prisma.users.findUnique({
        where: {
          email: mail,
        },
      });
      if (responseEmail) {
        if (responseEmail.password === pass) {
          const payload = {
            id: responseEmail.id,
            email: responseEmail.email,
          };
          jwt.sign(payload, Key, { expiresIn: 31556926 }, (err, token) => {
            if (err) {
              res.status(400).json({ err: err.message });
            }
            res
              .status(200)
              .json({ sucess: true, token, email: responseEmail.email });
          });
        } else {
          res.status(400).json({ err: 'password Incorreta' });
        }
      } else {
        res.status(400).json({ err: 'email nao existe' });
      }
    } else {
      res.status(400).json({ err: 'invalid request' });
    }
  } else {
    res.status(400).json({ err: 'invalid request' });
  }
};

export default handler;

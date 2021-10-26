/* eslint-disable import/extensions */

import { Container, Typography, Box } from '@material-ui/core';
import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import { parseCookies } from 'nookies';
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import AllPosters from '../../components/allPosters';
import useGlobal from '../../hooks/useGlobal';

type ResponseToken = {
  email: string;
};

const prisma = new PrismaClient();
const cookies = parseCookies();
const { auth } = cookies;

export default function Home({ posters }) {
  const { user, setUser } = useGlobal();

  const connect = async (token) => {
    const response: AxiosResponse<ResponseToken> = await axios.get(
      'http://localhost:3000/api/usuario',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setUser(response.data.email);
  };
  useEffect(() => {
    alert(
      'Este projeto nao tem tratamento de erro.\nEste site foi apenas para treinamento de novas ideias',
    );
  }, []);

  useEffect(() => {
    if (auth) {
      connect(auth);
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        border: '1px solid #ddd',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Typography
        sx={{ letterSpacing: '5px', fontWeight: 'light', fontSize: '25px' }}
      >
        All Question
      </Typography>
      <Box>
        <AllPosters posters={posters} />
      </Box>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posters = await prisma.posters.findMany();

  return {
    props: { posters },
  };
};

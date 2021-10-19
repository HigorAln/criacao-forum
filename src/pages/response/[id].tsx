/* eslint-disable import/extensions */
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import nookies from 'nookies';
import axios, { AxiosResponse } from 'axios';
import { Box, Typography, Container, Avatar } from '@material-ui/core';
import useGlobal from '../../../hooks/useGlobal';

type ResponseToken = {
  email: string;
  id: number;
};

const prisma = new PrismaClient();

const Response = ({ Logada, Post, PerfilPergunta }) => {
  const { setUser } = useGlobal();
  setUser(Logada.email);
  console.log(Post);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ margin: '20px' }}
            src="https://avatars.githubusercontent.com/u/86208458?v=4"
          />
          {PerfilPergunta.name ? (
            PerfilPergunta.name
          ) : (
            <Typography>Anonnymous</Typography>
          )}
        </Box>
        <Typography
          variant="h3"
          color="primary"
          sx={{
            margin: '20px 0px',
            border: `1px solid #ddd`,
            borderRadius: '10px',
          }}
        >
          {Post.title}
        </Typography>
        <Typography>
          <i>Description</i>
        </Typography>
        <Box
          sx={{
            border: `1px solid #ddd`,
            width: `100%`,
            borderRadius: '5px',
            padding: '20px',
          }}
        >
          <Typography variant="body1">{Post.description}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Response;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const key = Number(id);
  const cookie = nookies.get(context);
  if (!cookie.auth) {
    return {
      notFound: true,
    };
  }
  const token = cookie.auth;

  const Token: AxiosResponse<ResponseToken> = await axios.get(
    'http://localhost:3000/api/usuario',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const Logada = {
    id: Token.data.id,
    email: Token.data.email,
  };

  const Post = await prisma.posters.findUnique({
    where: { id: key },
  });
  const PerfilPergunta = await prisma.users.findUnique({
    where: { id: Post.authorId },
  });

  return {
    props: { Logada, Post, PerfilPergunta },
  };
};

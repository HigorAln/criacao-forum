/* eslint-disable import/extensions */
import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { setCookie } from 'nookies';
import useGlobal from '../hooks/useGlobal';

export default function LoginModal({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signinGitHub, setUser } = useGlobal();

  type Request = {
    sucess: boolean;
    token: string;
    email: string;
  };

  const handleSubmit = async () => {
    const response: AxiosResponse<Request> = await axios.post(
      'http://localhost:3000/api/login',
      {
        email,
        password,
      },
    );
    const { data } = response;
    if (data.sucess === true) {
      setCookie(null, 'auth', data.token, {
        maxAge: 8600,
        path: '/',
      });
    }
    console.log(data, ' // ', data.email);
    setUser(data.email);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginTop: '20px',
      }}
    >
      <Box
        sx={{
          width: '400px',
          border: '1px solid #ddd',
          height: '500px',
          backgroundColor: 'rgba(255,255,255,.9)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ margin: '10px', fontWeight: 'light' }}>
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Email"
            sx={{ margin: '10px 0px', width: '80%' }}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            sx={{ margin: '10px 0px', width: '80%' }}
            autoComplete="current-password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="outlined" color="primary" type="submit">
            Enter
          </Button>
        </form>
        <Box
          sx={{ margin: '20px 0', display: 'flex', flexDirection: 'column' }}
        >
          <Button
            variant="outlined"
            color="warning"
            sx={{ margin: '5px 0' }}
            onClick={signinGitHub}
          >
            Enter with - <GitHub />
          </Button>
          <Button variant="outlined" color="success" sx={{ margin: '5px 0' }}>
            Enter with Google
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

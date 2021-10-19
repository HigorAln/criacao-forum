/* eslint-disable import/extensions */
import { Button, Modal, TextField, Box, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import useGlobal from '../hooks/useGlobal';

export default function SignUpModal({ open, handleClose }) {
  const { signinGitHub } = useGlobal();
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
          Sign up
        </Typography>
        <form
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
          />
          <TextField
            variant="outlined"
            placeholder="Your name"
            sx={{ margin: '10px 0px', width: '80%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            sx={{ margin: '10px 0px', width: '80%' }}
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

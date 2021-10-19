/* eslint-disable import/extensions */
import { Avatar, Box, Button, Typography } from '@material-ui/core';
import Link from 'next/link';
import useGlobal from '../hooks/useGlobal';
import WithModal from './Modal';

function TopBar({ handleOpenIn, handleOpenUp }) {
  const { user } = useGlobal();
  return (
    <Box
      sx={{
        width: '100%',
        height: '8vh',
        display: 'flex',
        borderBottom: '1px solid #ddd',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 50px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            color: 'blue',
            fontFamily: 'Ubuntu',
            userSelect: 'none',
            marginRight: '30px',
          }}
        >
          Forum
        </Typography>
        <div>
          <Link href="/">
            <a style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: '5px' }}
              >
                Home
              </Button>
            </a>
          </Link>
          {user && (
            <Button variant="outlined" color="primary">
              Create new Poster
            </Button>
          )}
        </div>
      </Box>
      {!user && (
        <div>
          <Button
            variant="outlined"
            color="primary"
            sx={{ margin: '0 5px' }}
            onClick={handleOpenIn}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ margin: '0 5px' }}
            onClick={handleOpenUp}
          >
            Sing up
          </Button>
        </div>
      )}
      {user && (
        <Avatar
          alt="usuarios"
          src="https://avatars.githubusercontent.com/u/86208458?v=4"
        />
      )}
    </Box>
  );
}

export default WithModal(TopBar);

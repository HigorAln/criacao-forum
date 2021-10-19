/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Posters } from '.prisma/client';
import useGlobal from '../hooks/useGlobal';
import WithModal from './Modal';

const allPosters = ({ posters, handleOpenIn }) => {
  const { user } = useGlobal();
  const router = useRouter();
  const handleResponse = (id) => {
    if (user) {
      router.push(`/response/${id}`);
      return true;
    }
    handleOpenIn();
  };
  return (
    <>
      {posters.map((posters: Posters) => (
        <Accordion key={posters.id}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ bgcolor: '#F8F8FF' }}
          >
            <Typography sx={{}}>{posters.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#FFFAFA', paddingLeft: '40px' }}>
            <Typography sx={{ fontSize: '15px' }}>
              {posters.description}
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleResponse(posters.id)}
              >
                Responder
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default WithModal(allPosters);

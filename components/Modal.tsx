/* eslint-disable import/extensions */
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const WithModal = (Component) => (props) => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleCloseIn = () => setOpenSignIn(false);
  const handleOpenIn = () => setOpenSignIn(true);

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleCloseUp = () => setOpenSignUp(false);
  const handleOpenUp = () => setOpenSignUp(true);
  return (
    <>
      <LoginModal open={openSignIn} handleClose={handleCloseIn} />
      <SignUpModal open={openSignUp} handleClose={handleCloseUp} />
      <Component
        handleOpenIn={handleOpenIn}
        handleOpenUp={handleOpenUp}
        {...props}
      />
    </>
  );
};

export default WithModal;

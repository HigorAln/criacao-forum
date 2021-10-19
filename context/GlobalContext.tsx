/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
// import { ThemeProvider } from '@material-ui/system';
import { createContext, useState } from 'react';
import { GithubAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import '../lib/firebase';

export const MyContext = createContext(null);
const auth = getAuth();
const providerGit = new GithubAuthProvider();

export const GlobalContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tema, setTema] = useState(false);

  const signinGitHub = () => {
    signInWithPopup(auth, providerGit)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        console.log(result.user);
        console.log(credential);
        setUser(result.user);
      })
      .catch((err) => {
        // const errorCod = err.code;
        // const errorMensage = err.message;
        console.log(err);
      });
  };

  return (
    <MyContext.Provider value={{ tema, setTema, user, setUser, signinGitHub }}>
      {children}
    </MyContext.Provider>
  );
};

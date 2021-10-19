/* eslint-disable import/extensions */
import TopBar from '../../components/Topbar';
import { GlobalContext } from '../../context/GlobalContext';
import GlobalStyled from '../styles/GlobalStyled';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContext>
      <GlobalStyled />
      <TopBar />
      <Component {...pageProps} />
    </GlobalContext>
  );
}

export default MyApp;

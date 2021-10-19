/* eslint-disable import/extensions */
import { useContext } from 'react';
import { MyContext } from '../context/GlobalContext';

const useGlobal = () => useContext(MyContext);

export default useGlobal;

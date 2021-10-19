import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCXJ1wpaC-nVndrFyxQ1t7dadYma49SngE',
  authDomain: 'curso-next-auth.firebaseapp.com',
  projectId: 'curso-next-auth',
  storageBucket: 'curso-next-auth.appspot.com',
  messagingSenderId: '106119189334',
  appId: '1:106119189334:web:af24ac31d359ca2a373cf7',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;

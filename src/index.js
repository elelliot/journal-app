import React from 'react';
import ReactDOM from 'react-dom';

import './styles/styles.scss';
import { JournalApp } from './JournalApp';

ReactDOM.render(
  //Como da warnings por no estar en StrictMode en el tab Components, se los puse, también le puse autoComplete a los campos del login, en caso de error se los puedo quitar
    <React.StrictMode>
      <JournalApp />
    </React.StrictMode>
    ,
  document.getElementById('root')
);


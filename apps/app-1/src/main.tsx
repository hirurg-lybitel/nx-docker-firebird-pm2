import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './app/features/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApiProvider api={api}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApiProvider>
);

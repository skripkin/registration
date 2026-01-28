import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './api/store';

import { MessageProvider } from './features/AlertProvider';

import App from './App';
import './localization/';
import './index.css';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'warn',
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MessageProvider>
        <App />
      </MessageProvider>
    </Provider>
  </React.StrictMode>,
);

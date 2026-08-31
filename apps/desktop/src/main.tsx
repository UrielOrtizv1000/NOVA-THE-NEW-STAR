import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Entry point of the NOVA desktop app.
// Mounts the React tree into the #root element (see index.html).
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

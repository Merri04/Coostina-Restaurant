import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/layout/App';
import reportWebVitals from './reportWebVitals';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Check if rootElement is not null, and then render the App
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();

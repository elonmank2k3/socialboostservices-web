import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/main.css"
import "./styles/variables.css"
import "./styles/utilities.css"
import "./styles/bootstrap-custom.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>
);

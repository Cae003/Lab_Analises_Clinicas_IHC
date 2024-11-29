import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AccessHistoryStore } from './stores/AccessHistoryStore';
import { UserStore } from './stores/UserStore';
import { UsuariosStore } from './stores/UsuariosStore';
import { ExamesStore } from './stores/ExameStore';
import { PacienteStore } from './stores/PacienteStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AccessHistoryStore>
        <UsuariosStore>
          <PacienteStore>
            <ExamesStore>
              <UserStore>
                <App />
              </UserStore>
            </ExamesStore>
          </PacienteStore>
        </UsuariosStore>
      </AccessHistoryStore>
    </Router>
  </React.StrictMode>
);
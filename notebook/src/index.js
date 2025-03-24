import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './component/blackboard/blackboard_style.css'
import reportWebVitals from './reportWebVitals';
import App from './App';
import { AuthProvider} from './component/blackboard/customHooks/authhook';
import {AppContextProvider} from "./component/blackboard/customHooks/appHook";
import { SocketProvider } from "./component/blackboard/customHooks/websocket";

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log('this is index file');
root.render(
  <React.StrictMode>
    <AppContextProvider>

        <AuthProvider>

          <SocketProvider>
             <App/>
          </SocketProvider>
          
        </AuthProvider>

      </AppContextProvider>
  </React.StrictMode>
);
reportWebVitals();

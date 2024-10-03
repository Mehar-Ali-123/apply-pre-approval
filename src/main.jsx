import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import './../node_modules/primeflex/primeflex.css'       
import "./../node_modules/primeicons/primeicons.css";  
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";   
import "@fontsource/poppins";                         
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {store} from './store/store'
import { Provider } from 'react-redux';  
// import { RentalProvider } from "./context/RentalContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
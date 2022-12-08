import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AuthorizationContext, { AuthorizationContextProvider } from './Context/AuthorizationContext';
import { ToastContextProvider } from './Context/ToastContext';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <ToastContextProvider>
        <AuthorizationContextProvider>
          <Layout>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/' element={<Home />}></Route>
            </Routes>
          </Layout>
        </AuthorizationContextProvider>
      </ToastContextProvider>
    </BrowserRouter >

  );
}

export default App;

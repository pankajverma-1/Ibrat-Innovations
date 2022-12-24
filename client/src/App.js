import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Screen/Cart/Cart';
import Home from './Screen/HomeScreen/Home';
import Login from './Screen/Login/Login';
import Register from './Screen/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Helmet>
          <title>Shopping</title>
        </Helmet>
        <Navbar />
        <div className=" container-fluid container-lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

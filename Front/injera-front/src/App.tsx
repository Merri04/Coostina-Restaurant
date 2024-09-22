import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import ReservationPage from './pages/Reservation';
import Restaurant from './pages/Restaurant';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import Login from './components/Login';



const App: React.FC = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/restaurant" element={<Restaurant/>} />
          <Route path="/admin/register" Component={AdminRegister} />
          <Route path="/admin/login" Component={Login} />
          <Route path="/admin/dashboard" Component={AdminDashboard} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;

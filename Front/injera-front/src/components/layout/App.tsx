import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header-Footer/Header';
import Footer from '../Header-Footer/Footer';
import Home from '../../pages/not-developed/Home';
import Menu from '../../pages/Developed/Menu';
import Contact from '../../pages/not-developed/Contact';
import Restaurant from '../../pages/not-developed/Restaurant';
import AdminRegister from '../Register-login/AdminRegister';
import AdminDashboard from '../../pages/Developed/AdminDashboard';
import Login from '../Register-login/Login';
import Reservation from '../../pages/Developed/Reservation';
import PrivateRoute from '../Routes/PrivateRoute';




const App: React.FC = () => {
  return (
    <Router>
        <Header />
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/admin/register" element={<AdminRegister />} /> {/* Updated */}
        <Route path="/admin/login" element={<Login />} /> {/* Updated */}
        {/* Protect the admin dashboard with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;

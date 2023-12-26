import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importa tus componentes aquí...
import Login from './components/Auth/Login';
import RegisterUser from './components/Auth/RegisterUser';
import RegisterCompany from './components/Auth/RegisterCompany';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DriverDashboard from './components/Dashboard/DriverDashboard';
import CompanyDashboard from './components/Dashboard/CompanyDashboard';
import OrderList from './components/Order/OrderList';
import OrderDetails from './components/Order/OrderDetails';
import NewOrder from './components/Order/NewOrder';
import MessageConfig from './components/Order/MessageConfig';
import MapView from './components/Tracking/MapView';
import TrackingInfo from './components/Tracking/TrackingInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* Rutas para Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-company" element={<RegisterCompany />} />

        {/* Rutas para Dashboards */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} />

        {/* Rutas para Pedidos */}
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order/details/:id" element={<OrderDetails />} />
        <Route path="/order/new" element={<NewOrder />} />
        <Route path="/order/message-config" element={<MessageConfig />} />

        {/* Rutas para Seguimiento */}
        <Route path="/tracking/map" element={<MapView />} />
        <Route path="/tracking/info/:id" element={<TrackingInfo />} />

        {/* Puedes agregar aquí más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;

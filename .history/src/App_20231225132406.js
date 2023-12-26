import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importa tus componentes
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
      <Switch>
        {/* Rutas para Autenticación */}
        <Route exact path="/login" component={<Login />} />
        <Route exact path="/register-user" component={<RegisterUser />} />
        <Route exact path="/register-company" component={<RegisterCompany />} />

        {/* Rutas para Dashboards */}
        <Route exact path="/dashboard/admin" component={<AdminDashboard />} />
        <Route exact path="/dashboard/driver" component={<DriverDashboard />} />
        <Route exact path="/dashboard/company" component={<CompanyDashboard />} />

        {/* Rutas para Pedidos */}
        <Route exact path="/orders" component={<OrderList} />
        <Route exact path="/order/details/:id" component={<OrderDetails />} />
        <Route exact path="/order/new" component={<NewOrder />} />
        <Route exact path="/order/message-config" component={<MessageConfig />} />

        {/* Rutas para Seguimiento */}
        <Route exact path="/tracking/map" component={<MapView />} />
        <Route exact path="/tracking/info/:id" component={<TrackingInfo />} />

        {/* Puedes agregar aquí más rutas según sea necesario */}
      </Switch>
    </Router>
  );
}

export default App;

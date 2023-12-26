// src/components/Dashboard/CompanyDashboard.js
import { useEffect, useState } from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { Container, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const CompanyDashboard = () => {

  const useLatestOrders = () => {
    const [orders, setOrders] = useState([]);
    const firestore = getFirestore();
  
    useEffect(() => {
      const fetchLatestOrders = async () => {
        const ordersQuery = query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(ordersQuery);
        const latestOrders = querySnapshot.docs.map(doc => doc.data());
        setOrders(latestOrders);
      };
  
      fetchLatestOrders();
    }, []);
  
    return orders;
  };
  
  const latestOrders = useLatestOrders();

  return (
    <>
      <CompanyAppBar />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Panel de Control de la Empresa
            </Typography>

            {/* Puedes agregar más botones o enlaces según sea necesario */}
          </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Company Dashboard
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Últimos Pedidos</Typography>
          <List>
            {latestOrders.map((order, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Pedido ID: ${order.id}`} secondary={`Fecha: ${order.createdAt}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
      </Container>
    </>
  );
};

export default CompanyDashboard;

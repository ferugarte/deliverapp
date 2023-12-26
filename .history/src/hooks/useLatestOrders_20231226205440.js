// src/hooks/useLatestOrders.js
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

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
  }, [firestore]);

  return orders;
};

export default useLatestOrders;

import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import OrderCard from './OrderCard';

const Undeliveredorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const shopName = useSelector(state => state.auth.user?.name);
  const accessToken = useSelector(state => state.auth.accessToken);
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchUnclaimedOrders = async () => {
    if (!shopName || !accessToken) return;
    setLoading(true);
    try {
      const url = `http://localhost:1700/api/order/shopname/${shopName}?onlyUnclaimed=true`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOrders(data);
    } catch (err) {
      console.error('שגיאה בטעינת הזמנות שלא נלקחו', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnclaimedOrders();
  }, [shopName, accessToken]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        p: isMobile ? 2 : 6,
        m: 0,
        border: 'none',
        boxShadow: 'none',
        zIndex: 1,
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        sx={{
          fontWeight: 800,
          color: '#2e7d32',
          textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
          mb: 4,
          fontFamily: 'Rubik, sans-serif',
          textAlign: 'center',
          width: '100%',
          maxWidth: 600,
        }}
      >
        הזמנות שלא נלקחו מעל 10 דקות
      </Typography>

      {loading ? (
        <CircularProgress color="success" />
      ) : orders.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            color: '#5d4037',
            textShadow: '1px 1px 2px rgba(255,255,255,0.6)',
            textAlign: 'center',
            width: '100%',
            maxWidth: 600,
          }}
        >
          אין הזמנות ממתינות להצגה
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3,
            width: '100%',
            maxWidth: 1200,
          }}
        >
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Undeliveredorders;

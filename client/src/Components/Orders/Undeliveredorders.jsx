import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  useMediaQuery
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
      className="orders-background"
      sx={{
        backgroundImage: `url('/images/bg-light.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        p: isMobile ? 2 : 6,
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        align="center"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#fff',
          textShadow: '1px 1px 3px #000',
        }}
      >
        הזמנות שלא נלקחו מעל 10 דקות
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="h6" align="center" color="#eee">
          אין הזמנות ממתינות להצגה
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {orders.map((order, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <OrderCard order={order} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Undeliveredorders;

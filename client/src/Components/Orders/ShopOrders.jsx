import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import OrderCard from './OrderCard';
import AddOrder from './AddOrder';
import { Tooltip } from '@mui/material';

import { useState, useEffect } from 'react';

const ShopOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const shopName = useSelector(state => state.auth.user?.name);
    const userRole = useSelector(state => state.auth.user?.role);
    const accessToken = useSelector(state => state.auth.accessToken);

    const fetchOrders = async () => {
        if (!shopName || !accessToken) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:1700/api/order/shopname/${shopName}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const filteredOrders = data.filter(order => order.status === 'Awaiting delivery');
            setOrders(filteredOrders);
        } catch (err) {
            console.error('שגיאה בטעינת ההזמנות', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [shopName, accessToken]);

    return (
<Box
  sx={{
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent', // רקע שקוף לחלוטין
    backdropFilter: 'none',         // בלי טשטוש (אם לא רוצים)
    p: 0,                           // בלי ריווח פנימי
    m: 0,                           // בלי שוליים חיצוניים
    border: 'none',                // בלי מסגרת
    boxShadow: 'none',             // בלי צל
    zIndex: 1,
  }}
>

  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      color: '#2e7d32',
      textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
      mb: 4,
      fontFamily: 'Rubik, sans-serif',
    }}
  >
    ההזמנות שלי
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
      }}
    >
      אין הזמנות להצגה
    </Typography>
  ) : (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 3,
        width: '100%',
      }}
    >
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </Box>
  )}

  {/* כפתור הוספה */}
  {(userRole === 'Shop' || userRole === 'Admin') && (
    <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10 }}>
      <Tooltip title="הוספת הזמנה">
        <Button
          onClick={() => setShow(true)}
          sx={{
            backgroundColor: '#2e7d32',
            color: '#fff',
            borderRadius: '50%',
            minWidth: 64,
            minHeight: 64,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: '#1b5e20',
              transform: 'scale(1.1)',
            },
          }}
        >
          <AddIcon fontSize="large" />
        </Button>
      </Tooltip>
    </Box>
  )}

  <AddOrder show={show} setShow={setShow} fetchOrders={fetchOrders} />
</Box>

    );
};

export default ShopOrders;

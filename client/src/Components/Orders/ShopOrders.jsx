import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import OrderCard from './OrderCard';
import AddOrder from './AddOrder'; // ודא שזה הנתיב הנכון

const ShopOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false); // ✅ נדרש כדי לשלוט על AddOrder

    const shopName = useSelector(state => state.auth.user?.name);
    const userRole = useSelector(state => state.auth.user?.role); // ✅ אם תרצי לבדוק הרשאות
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
                backgroundImage: `url('/images/background.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                padding: 4,
            }}
        >
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'white', mb: 4 }}>
                ההזמנות שלי
            </Typography>

            {/* כפתור הוספה מוצג רק אם יש הרשאה */}
            {(userRole === 'Shop' || userRole === 'Admin') && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 10,
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: '#1E88E5',
                            color: 'white',
                            borderRadius: '50%',
                            minWidth: '64px',
                            minHeight: '64px',
                            boxShadow: 4,
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: '#1E88E5',
                                boxShadow: 6,
                                transform: 'scale(1.1)',
                            },
                        }}
                        onClick={() => setShow(true)}
                    >
                        <AddIcon sx={{ fontSize: 28 }} />
                    </Button>
                </Box>
            )}

            <AddOrder show={show} setShow={setShow} fetchOrders={fetchOrders} />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress color="inherit" />
                </Box>
            ) : orders.length === 0 ? (
                <Typography variant="h6" align="center" color="white">
                    אין הזמנות להצגה
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {orders.map((order, index) => (
                        <Grid item key={index} xs={12} sm={6} md={6}>
                            <OrderCard order={order} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ShopOrders;

import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Box,
    Button,
    Grid,
    CircularProgress,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import AddOrder from '../Orders/AddOrder';

const InProgressOrder = () => {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    const shopName = useSelector(state => state.auth.user?.name);
    const userRoles = useSelector(state => state.auth.user?.role);
    const accessToken = useSelector(state => state.auth.accessToken);

    const fetchOrders = async () => {
        if (!shopName || !accessToken) return;
        setLoading(true);
        try {
            const url = `http://localhost:1700/api/order/shopname/${shopName}`;
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const filteredOrders = data.filter(order => order.status === 'Delivered');

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    }));

    const canAddOrder = Array.isArray(userRoles)
        ? userRoles.includes('Shop') || userRoles.includes('Admin')
        : userRoles === 'Shop' || userRoles === 'Admin';

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                הזמנות שבוצעו✔️✔️      </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : orders.length === 0 ? (
                <Typography variant="h6" align="center" color="text.secondary">
                    אין הזמנות להצגה
                </Typography>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {orders.map((order, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                sx={{
                                    boxShadow: 6,
                                    borderRadius: 4,
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: 10,
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: red[500],
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        width: 48,
                                        height: 48,
                                        fontSize: 20,
                                        zIndex: 1,
                                    }}
                                >
                                    {order.ordername?.charAt(0)}
                                </Avatar>

                                {order.imageUrl?.trim() && (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={order.imageUrl}
                                        alt={order.ordername}
                                        sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                                    />
                                )}

                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                                    >
                                        {order.ordername}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1, textAlign: 'center' }}
                                    >
                                        {order.description}
                                    </Typography>
                                </CardContent>

                                <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2 }}>
                                    <Box>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon sx={{ color: '#E57373' }} />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon sx={{ color: '#64B5F6' }} />
                                        </IconButton>
                                    </Box>

                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

          

        </Box>
    );
};

export default InProgressOrder;

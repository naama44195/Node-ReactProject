import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Tooltip,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const InProgressOrder = () => {
    const [orders, setOrders] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    const shopName = useSelector(state => state.auth.user?.name);
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

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'transparent',
                backdropFilter: 'none',
                p: 0,
                m: 0,
                border: 'none',
                boxShadow: 'none',
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
                הזמנות שבוצעו
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
                        px: 2,
                    }}
                >
                    {orders.map((order, index) => (
                        <Card
                            key={index}
                            sx={{
                                boxShadow: 6,
                                borderRadius: 4,
                                backgroundColor: '#ffffff',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 10,
                                },
                                position: 'relative',
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
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#2e7d32',
                                    }}
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

                                <Box
                                    sx={{
                                        mt: 2,
                                        textAlign: 'center',
                                        bgcolor: '#e8f5e9',
                                        color: '#2e7d32',
                                        fontWeight: 'bold',
                                        borderRadius: 2,
                                        py: 1,
                                        px: 2,
                                    }}
                                >
                                   בוצע בהצלחה
                                </Box>
                            </CardContent>

                            <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2 }}>
                                <Box>
                                    <Tooltip title="אהבתי">
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon sx={{ color: '#E57373' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="שתף">
                                        <IconButton aria-label="share">
                                            <ShareIcon sx={{ color: '#64B5F6' }} />
                                        </IconButton>
                                    </Tooltip>
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
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default InProgressOrder;

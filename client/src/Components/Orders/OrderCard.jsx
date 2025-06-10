import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Collapse,
    Box,
    Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const OrderCard = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 6,
                backdropFilter: 'blur(4px)',
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.01)' },
                overflow: 'hidden',
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
                {order.imageUrl ? (
                    <CardMedia
                        component="img"
                        image={order.imageUrl}
                        alt={order.ordername}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            backgroundColor: '#f0f0f0',
                        }}
                    />
                ) : (
                    <Box sx={{ width: '100%', height: '100%', backgroundColor: '#ccc' }} />
                )}

                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        width: 64,
                        height: 64,
                        fontSize: 26,
                        border: '2px solid white',
                    }}
                >
                    {order.ordername?.charAt(0)}
                </Avatar>

                <Chip
                    label="ממתין"
                    color="warning"
                    size="medium"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        bgcolor: 'rgba(255,183,77,0.9)',
                        color: '#fff',
                    }}
                />
            </Box>

            <CardContent sx={{ backgroundColor: 'rgba(255,255,255,0.95)', textAlign: 'center', px: 3, py: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {order.ordername}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                    {order.description || 'אין תיאור זמין.'}
                </Typography>
            </CardContent>

            <CardActions disableSpacing sx={{ px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.8)' }}>
                <IconButton>
                    <FavoriteIcon sx={{ color: '#FF4081' }} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="הצג עוד"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{ px: 3, pb: 3, bgcolor: 'rgba(255,255,255,0.9)' }}>
                    <Typography variant="body2" sx={{ color: '#444' }}>
                        ✉️ לקוח: {order.customer || 'לא ידוע'}
                        <br />
                        🕓 זמן: {order.time || '---'}
                        <br />
                        📌 הערות: {order.notes || 'אין'}
                    </Typography>
                </Box>
            </Collapse>
        </Card>
    );
};

export default OrderCard;

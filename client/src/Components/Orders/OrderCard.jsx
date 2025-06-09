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
                height: '100%',
                width: '100%',
                maxWidth: 500,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                boxShadow: 6,
                backdropFilter: 'blur(4px)',
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.02)' },
            }}
        >

            <Box sx={{ position: 'relative' }}>
                {order.imageUrl ? (
                    <CardMedia
                        component="img"
                        height="150"
                        width={200} 
                        image={order.imageUrl}
                        alt={order.ordername}
                        sx={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Box sx={{ height: 220, backgroundColor: '#ddd' }} />
                )}

                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        width: 56,
                        height: 56,
                        fontSize: 24,
                        border: '2px solid white',
                    }}
                >
                    {order.ordername?.charAt(0)}
                </Avatar>

                <Chip
                    label="ממתין"
                    color="warning"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        bgcolor: 'rgba(255,183,77,0.9)',
                        color: '#fff',
                    }}
                />
            </Box>

            <CardContent sx={{ backgroundColor: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {order.ordername}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                    {order.description || 'אין תיאור זמין.'}
                </Typography>
            </CardContent>

            <CardActions disableSpacing sx={{ px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.7)' }}>
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
                <Box sx={{ px: 2, pb: 2, bgcolor: 'rgba(255,255,255,0.8)' }}>
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

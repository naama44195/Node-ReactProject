import React from 'react';
import {
    AppBar, Box, Toolbar, Typography,
    IconButton, Tooltip, Container, Paper,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/Admin';
    const backgroundImageUrl = 'images/M.jpg'; // שנה לנתיב הנכון במידת הצורך

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'contain', // או 'cover' לפי הצורך
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.4)', // הצללה עדינה לשיפור קריאות
                    zIndex: 0
                }
            }}
        >
            {/* AppBar */}
            <AppBar
                position="sticky"
                elevation={6}
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    color: '#333',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 2,
                    px: 2,
                }}
            >
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0d47a1', mx: 2 }}>
                        🛠️ מערכת ניהול
                    </Typography>
                    <Box>
                        <Tooltip title="דף הבית">
                            <IconButton onClick={() => navigate('/Admin')} sx={{ color: '#0d47a1', mx: 1 }}>
                                <HomeIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="משלוחנים">
                            <IconButton onClick={() => navigate('/Admin/ListDeliver')} sx={{ color: '#0d47a1', mx: 1 }}>
                                <DeliveryDiningIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="חנויות">
                            <IconButton onClick={() => navigate('/Admin/ListShop')} sx={{ color: '#0d47a1', mx: 1 }}>
                                <StorefrontIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="התנתק" arrow>
                            <IconButton
                                onClick={() => navigate('/LogOut')}
                                sx={{
                                    color: '#c62828',
                                    mx: 1,
                                    '&:hover': { bgcolor: '#ef535033' }
                                }}
                            >
                                <LogoutIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* תוכן הדף */}
            <Container
                maxWidth="md"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    mt: 10,
                    mb: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: isHome ? '75vh' : 'auto',
                }}
            >
                {isHome ? (
                    <Paper
                        elevation={6}
                        sx={{
                            p: 5,
                            borderRadius: 4,
                            textAlign: 'center',
                            bgcolor: 'rgba(255,255,255,0.85)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(3px)',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 2,
                                fontWeight: 900,
                                color: '#0d47a1',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                fontFamily: 'Rubik, sans-serif',
                            }}
                        >
                            ברוכה הבאה למערכת הניהול
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                mb: 4,
                                color: '#4e342e',
                                fontWeight: 500,
                            }}
                        >
                            כאן תוכלי לנהל בקלות את המשלוחנים, החנויות ועוד.
                        </Typography>

                        <Box
                            component="img"
                            src="https://cdn-icons-png.flaticon.com/512/2972/2972499.png"
                            alt="dashboard"
                            sx={{
                                width: { xs: '70%', md: '250px' },
                                transition: '0.3s',
                                '&:hover': { transform: 'scale(1.05)' }
                            }}
                        />
                    </Paper>
                ) : (
                    <Box
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.95)',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 3,
                            width: '100%',
                            backdropFilter: 'blur(3px)'
                        }}
                    >
                        <Outlet />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Admin;

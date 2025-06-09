import React from 'react';
import {
  AppBar, Box, Toolbar, Typography,
  IconButton, Tooltip, Container, Paper
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReportIcon from '@mui/icons-material/Report';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';

const Shops = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shopName = useSelector((state) => state.auth.user.name);

  const backgroundImageUrl = process.env.PUBLIC_URL + "/images/Pizza.jpg";

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 0,
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          bgcolor: 'rgba(46, 125, 50, 0.9)',
          backdropFilter: 'blur(6px)',
          px: 3,
          zIndex: 2,
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: '#fff',
              textShadow: '1px 1px 2px #000',
            }}
          >
            {shopName ? `🍃 ${shopName}` : 'רשת החנויות 🍃'}
          </Typography>

          <Tooltip title="דף הבית">
            <IconButton onClick={() => navigate('/Shop')} sx={{ color: '#fff', mx: 1 }}>
              <HomeIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="כל ההזמנות">
            <IconButton onClick={() => navigate('/Shop/ShopOrders')} sx={{ color: '#fff', mx: 1 }}>
              <ListAltIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="הזמנות שנלקחו">
            <IconButton onClick={() => navigate('/Shop/InProgressOrder')} sx={{ color: '#fff', mx: 1 }}>
              <ReportIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="הזמנות ממתינות">
            <IconButton onClick={() => navigate('/Shop/Undeliveredorders')} sx={{ color: '#fff', mx: 1 }}>
              <AccessTimeIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="התנתק" arrow>
            <IconButton
              onClick={() => navigate('/LogOut')}
              sx={{
                color: '#fff',
                mx: 1,
                '&:hover': { bgcolor: '#ef5350aa' }
              }}
            >
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
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
          minHeight: location.pathname === '/Shop' ? '75vh' : 'auto',
        }}
      >
        {location.pathname === '/Shop' ? (
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
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 900,
                color: '#2e7d32',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: 'Rubik, sans-serif',
              }}
            >
              ברוכה הבאה!
            </Typography>

            {shopName && (
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  color: '#6d4c41',
                  fontWeight: 600,
                  textShadow: '1px 1px 3px rgba(255,255,255,0.7)',
                }}
              >
                שלום, {shopName}
              </Typography>
            )}

            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#5d4037' }}>
              כאן תוכלי לצפות בכל ההזמנות, לעקוב אחרי הדוחות של השליחים,
              ולבדוק אילו הזמנות עדיין ממתינות לאיסוף.
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              width: '100%',
              zIndex: 1,
              // ללא רקע – שיאפשר לתמונה להישאר
            }}
          >
            <Outlet />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Shops;

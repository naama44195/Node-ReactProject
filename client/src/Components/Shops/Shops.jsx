import React from 'react';
import {
  AppBar, Box, Toolbar, Typography,
  IconButton, Tooltip, Container, Button
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
        fontFamily: 'Rubik, sans-serif',
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
        <Toolbar disableGutters sx={{ position: 'relative' }}>
          {/* כותרת ממורכזת באמצע */}
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 700,
              color: '#fff',
              textShadow: '1px 1px 2px #000',
            }}
          >
            {shopName ? ` ${shopName}` : 'רשת החנויות '}
          </Typography>

          {/* כפתורים מיושרים לימין */}
          <Box sx={{ marginLeft: 'auto' }}>
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
          </Box>
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
          <Box
            sx={{
              p: 6,
              borderRadius: 6,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              width: '100%',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 900,
                color: '#ffffff',
                textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
              }}
            >
              ברוכים הבאים            </Typography>

            {shopName && (
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  color: '#e8f5e9',
                  fontWeight: 600,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                }}
              >
                שלום, {shopName}
              </Typography>
            )}

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.3rem',
                color: '#f1f8e9',
                mb: 4,
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              כאן תוכלי לצפות בכל ההזמנות, לצפות במשלוחים שנמסרו,
              ולבדוק אילו הזמנות עדיין ממתינות לאיסוף.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/Shop/ShopOrders')}
              sx={{
                backgroundColor: '#66bb6a',
                color: '#fff',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: '#388e3c',
                  transform: 'scale(1.05)',
                },
              }}
            >
              לצפייה בהזמנות
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              zIndex: 1,
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

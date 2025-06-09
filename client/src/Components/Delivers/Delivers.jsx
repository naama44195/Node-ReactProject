
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AreaSortOrder from '../Orders/AreaSortOrder';
import DeliverActiveOrder from './DeliverActiveOrder'; // שונה מ-CurrentOrderForDeliver
import { useSelector, useDispatch } from 'react-redux'; // הוספת useDispatch
import { setDeliverActiveStatus } from '../../redux/tokenSlice'; // ייבוא הפעולה לעדכון סטטוס

const Delivers = () => {
    const dispatch = useDispatch(); // ייבוא ה-dispatch
    const navigate = useNavigate();
    // קבלת נתוני המשלוחן מתוך ה-auth slice ב-Redux store
    const deliverInfo = useSelector(state => state.auth.user);
    const deliverRole = useSelector(state => state.auth.user?.role); // גישה לתפקיד
    const accessToken = useSelector(state => state.auth.accessToken);

    // הגדרות ורכיבי MUI (לא משתנות)
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    // מצבי תפריט (לא משתנים)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // **פונקציות חדשות לעדכון סטטוס active**
    // אלה הפונקציות שיקראו כאשר המשלוחן מקבל/מסיים הזמנה
    const handleOrderAccepted = (orderId) => {
        // כששליח מקבל הזמנה, הוא הופך להיות "תפוס"
        dispatch(setDeliverActiveStatus({ active: false, currentOrder: orderId }));
        // כאן תוכל להוסיף קריאת axios ל-backend לעדכון ה-DB
        // לדוגמה: axios.put(`/api/delivers/${deliverInfo._id}`, { active: false, currentOrder: orderId });
    };

    const handleOrderCompleted = () => {
        // כששליח מסיים הזמנה, הוא הופך להיות "פנוי"
        dispatch(setDeliverActiveStatus({ active: true, currentOrder: null }));
        // כאן תוכל להוסיף קריאת axios ל-backend לעדכון ה-DB
        // לדוגמה: axios.put(`/api/delivers/${deliverInfo._id}`, { active: true, currentOrder: null });
    };


    // וודא שהמשלוחן מחובר והתפקיד שלו הוא "Deliver"
    if (!deliverInfo || deliverInfo.role !== "Deliver") {
        return <div>Unauthorized access or not a deliver user.</div>;
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                {/* <Tooltip title="התנתק" arrow>
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
                    </Tooltip> */}
                <Toolbar>
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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Deliver Dashboard
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <div>
                <br />
                <br />
                <br />
                {/* לוגיקה של רינדור מותנה לפי active:
                    אם active הוא TRUE (פנוי), מציג את רשימת ההזמנות (AreaSortOrder)
                    אם active הוא FALSE (תפוס), מציג את ההזמנה הנוכחית (DeliverActiveOrder)
                */}
                {deliverInfo.active ? ( // **השינוי העיקרי כאן:** אם deliverInfo.active הוא true (פנוי)
                    <AreaSortOrder
                        deliverId={deliverInfo._id}
                        deliverArea={deliverInfo.area}
                        deliverCity={deliverInfo.city}
                        onOrderAccepted={handleOrderAccepted} // העברת הפונקציה לקומפוננטת AreaSortOrder
                    />
                ) : ( // אם active הוא false (תפוס)
                    <DeliverActiveOrder
                        orderId={deliverInfo.currentOrder}
                        onOrderCompleted={handleOrderCompleted} // העברת הפונקציה לקומפוננטת DeliverActiveOrder
                    />
                )}
                <br />
                <br />
                <br />
            </div>
        </Box>
    );
}

export default Delivers;
// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import { Box, Paper } from '@mui/material';
// import { orange } from '@mui/material/colors';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const ListShop = () => {
//   const [shops, setShops] = useState([]);

//    const token = useSelector((state) => state.token.token);

//   const fetchShops = async () => {
//     try {
      
//       const { data } = await axios.get("http://localhost:1700/api/shop", {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setShops(data);
//     } catch (error) {
//       console.error("Error fetching shops:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchShops();
//   }, []);

//   return (
//     <List
//       sx={{
//         width: '100%',
//         maxWidth: 800,
//         bgcolor: 'transparent',
//         margin: 'auto',
//         mt: 4,
//         p: 2
//       }}
//     >
//       {shops.map((shop, index) => (
//         <React.Fragment key={index}>
//           <Paper 
//             elevation={3}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 2,
//               p: 2,
//               mb: 2,
//               borderRadius: 3,
//               background: index % 2 === 0 ? '#fff8f2' : '#fefefe',
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.01)',
//                 boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
//               }
//             }}
//           >
//             <ListItemAvatar>
//               {shop.imageUrl ? (
//                 <Avatar
//                   alt={shop.username}
//                   src={shop.imageUrl}
//                   sx={{ width: 60, height: 60 }}
//                 />
//               ) : (
//                 <Avatar
//                   sx={{
//                     bgcolor: orange[500],
//                     width: 60,
//                     height: 60
//                   }}
//                 >
//                   <StorefrontIcon fontSize="medium" />
//                 </Avatar>
//               )}
//             </ListItemAvatar>

//             <ListItemText
//               primary={
//                 <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
//                   {shop.username}
//                 </Typography>
//               }
//               secondary={
//                 <Box>
//                   <Typography variant="body1" sx={{ color: '#6c5c45' }}>
//                     {shop.name}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#999' }}>
//                     {shop.email}
//                   </Typography>
//                 </Box>
//               }
//             />
//           </Paper>
//         </React.Fragment>
//       ))}
//     </List>
//   );
// };

// export default ListShop;


import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import { orange } from '@mui/material/colors';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import AddShop from './AddShop'; // Assuming you have an AddShop component for adding new shops

const ListShop = () => {
  const [shops, setShops] = useState([]);
   const [showAdd, setShowAdd] = useState(false);

  // ניסיון לקבל את הטוקן מה-Redux, ואם לא – מ-localStorage
const token = useSelector((state) => state.auth?.accessToken)


  const fetchShops = async () => {
    console.log("Fetching shops with token:", token);
    try {
      const { data } = await axios.get("http://localhost:1700/api/shop", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error.message);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
 <Box sx={{ textAlign: 'center', mt: 4 }}>
     <Button
                    onClick={() => setShowAdd(true)}
                    variant="contained"
                    sx={{
                        mb: 3,
                        backgroundColor: "#4caf50",
                        borderRadius: 3,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: "#388e3c" }
                    }}
                >
                    ➕ הוסף חנות
                </Button>
    
                {/* מעביר את accessToken כ-prop ל-AddDeliver */}
                <AddShop
                    show={showAdd}
                    setShow={setShowAdd}
                    shops={shops}
                    setShops={setShops}
                    fetchShops={fetchShops}
                    // accessToken={accessToken} // אם AddDeliver לא ניגשת ישירות ל-Redux, ניתן להעביר כ-prop
                />
    <List
      sx={{
        width: '100%',
        maxWidth: 800,
        bgcolor: 'transparent',
        margin: 'auto',
        mt: 4,
        p: 2
      }}
    >
      {shops.map((shop, index) => (
        <React.Fragment key={index}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              mb: 2,
              borderRadius: 3,
              background: index % 2 === 0 ? '#fff8f2' : '#fefefe',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.01)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={shop.username}
                src={shop.imageUrl || ''}
                sx={{ width: 60, height: 60, bgcolor: shop.imageUrl ? 'transparent' : orange[500] }}
              >
                {!shop.imageUrl && <StorefrontIcon fontSize="medium" />}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                  {shop.username}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography variant="body1" sx={{ color: '#6c5c45' }}>
                    {shop.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    {shop.email}
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </React.Fragment>
      ))}
    </List>
     </Box>
  );
};

export default ListShop;
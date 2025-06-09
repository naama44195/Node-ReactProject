

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { setDeliverActiveStatus } from '../../redux/tokenSlice';
// import {
//   Card, CardContent, Typography, Button,
//   Box, CircularProgress, Alert
// } from '@mui/material';

// const DeliverActiveOrder = () => {
//   const dispatch = useDispatch();
//   const deliverInfo = useSelector(state => state.auth.user);
//   const token = useSelector((state) => state.auth.token);

//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchCurrentOrder = async () => {
//     if (!deliverInfo?._id || !deliverInfo?.currentOrder) {
//       setLoading(false);
//       setError('לשליח אין הזמנה פעילה כרגע.');
//       setCurrentOrder(null);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
//       const response = await axios.get(
//         `http://localhost:1700/api/order/${deliverInfo.currentOrder}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       setCurrentOrder(response.data);
//     } catch (err) {
//       console.error("Error fetching current order:", err.response ? err.response.data : err.message);
//       setError('נכשלה טעינת ההזמנה הנוכחית.');
//       setCurrentOrder(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentOrder();
//   }, [deliverInfo?.currentOrder]);

//   const handleDelivered = async () => {
//     if (!currentOrder || !deliverInfo?._id) return;

//     try {
//       // עדכון סטטוס הזמנה ל"Delivered"
//       await axios.put(
//         "http://localhost:1700/api/order",
//         {
//           _id: currentOrder._id,
//           status: "Delivered",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       // עדכון השליח במסד נתונים
//       await axios.put(
//         "http://localhost:1700/api/deliver",
//         {
//           ...deliverInfo,
//           currentOrder: null,
//           active: true,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // עדכון Redux מקומית
//       dispatch(setDeliverActiveStatus({
//         currentOrder: null,
//         active: true,
//       }));

//       alert("הזמנה נמסרה בהצלחה!");
//       setCurrentOrder(null);
//     } catch (err) {
//       console.error("Error setting order as delivered:", err.response ? err.response.data : err.message);
//       alert("שגיאה בעדכון סטטוס המסירה.");
//     }
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//   if (error) return <Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box>;
//   if (!currentOrder) return <Box sx={{ mt: 4 }}><Alert severity="info">אין לך הזמנה פעילה כרגע.</Alert></Box>;

//   const origin = "תל אביב, הרצל 10";
//   const destination = `${currentOrder.address.street}, ${currentOrder.address.city}`;
//   const mapSrc = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBemub5ocEI15R6rwcHdDXl1OEV-IwOT4g&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

//   return (
//     <Box sx={{
//       display: 'flex', gap: 4, padding: 4,
//       minHeight: '80vh', backgroundColor: '#f9f9f9'
//     }}>
//       {/* פרטי הזמנה */}
//       <Box sx={{ flex: 1 }}>
//         <Typography variant="h4" gutterBottom>
//           הזמנה נוכחית: {currentOrder.ordername}
//         </Typography>

//         <Card sx={{ padding: 2 }}>
//           <CardContent>
//             <img
//               src={currentOrder.imageUrl}
//               alt={currentOrder.ordername}
//               style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 16 }}
//             />
//             <Typography variant="h5" gutterBottom>{currentOrder.ordername}</Typography>
//             <Typography variant="body1" gutterBottom>{currentOrder.description}</Typography>
//             <Typography variant="body1" gutterBottom>
//               כתובת: {currentOrder.address.city}, {currentOrder.address.street}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               סטטוס: {currentOrder.status}
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleDelivered}
//               sx={{ mt: 2 }}
//             >
//               הזמנה נמסרה!
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* מפה */}
//       <Box sx={{ flex: 1 }}>
//         <iframe
//           title="Google Directions Map"
//           width="100%"
//           height="100%"
//           style={{ border: 0, minHeight: '500px', borderRadius: 8 }}
//           loading="lazy"
//           allowFullScreen
//           referrerPolicy="no-referrer-when-downgrade"
//           src={mapSrc}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default DeliverActiveOrder;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setDeliverActiveStatus } from '../../redux/tokenSlice';
// import {
//   Card, CardContent, Typography, Button,
//   Box, CircularProgress, Alert
// } from '@mui/material';

// const DeliverActiveOrder = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const deliverId = useSelector((state) => state.auth.user?._id);
//   const token = useSelector((state) => state.auth.token);

//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [deliverInfo, setDeliverInfo] = useState(null); // מצב מקומי למשלוחן

//   const fetchDeliverAndOrder = async () => {
//     if (!deliverId) {
//       setError('לא נמצא מזהה השליח.');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       // הבאת השליח מהשרת לפי ID
//       const deliverRes = await axios.get(
//         `http://localhost:1700/api/deliver/${deliverId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const deliver = deliverRes.data;
//       setDeliverInfo(deliver);

//       // אם אין הזמנה פעילה
//       if (!deliver.currentOrder) {
//         setCurrentOrder(null);
//         setError('לשליח אין הזמנה פעילה כרגע.');
//         setLoading(false);
//         return;
//       }

//       // הבאת ההזמנה עצמה
//       const orderRes = await axios.get(
//         `http://localhost:1700/api/order/${deliver.currentOrder}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCurrentOrder(orderRes.data);
//     } catch (err) {
//       console.error("שגיאה בקבלת מידע:", err.response?.data || err.message);
//       setError('שגיאה בטעינת פרטי השליח או ההזמנה.');
//       setCurrentOrder(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDeliverAndOrder();
//   }, [deliverId]);

//   const handleDelivered = async () => {
//     if (!currentOrder || !deliverId) return;

//     try {
//       // עדכון סטטוס ההזמנה ל-Delivered
//       await axios.put(
//         "http://localhost:1700/api/order",
//         {
//           _id: currentOrder._id,
//           status: "Delivered",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // עדכון השליח במסד הנתונים
//       await axios.put(
//         "http://localhost:1700/api/deliver",
//         {
//           ...deliverInfo,
//           currentOrder: null,
//           active: true,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // בקשה מחודשת לשליח מהשרת
//       const updatedDeliverRes = await axios.get(
//         `http://localhost:1700/api/deliver/${deliverId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const updatedDeliver = updatedDeliverRes.data;

//       // עדכון Redux
//       dispatch(setDeliverActiveStatus({
//         currentOrder: updatedDeliver.currentOrder,
//         active: updatedDeliver.active,
//       }));

//       // ניתוב לפי מצב
//       if (updatedDeliver.active && updatedDeliver.currentOrder === null) {
//         navigate('/Deliver');
//       } else if (!updatedDeliver.active && updatedDeliver.currentOrder !== null) {
//         navigate('/Deliver/myOrder');
//       }

//     } catch (err) {
//       console.error("שגיאה בסיום ההזמנה:", err.response?.data || err.message);
//       alert("שגיאה בעדכון סטטוס המסירה.");
//     }
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//   if (error) return <Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box>;
//   if (!currentOrder) return <Box sx={{ mt: 4 }}><Alert severity="info">אין לך הזמנה פעילה כרגע.</Alert></Box>;

//   const origin = "תל אביב, הרצל 10";
//   const destination = `${currentOrder.address.street}, ${currentOrder.address.city}`;
//   const mapSrc = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBemub5ocEI15R6rwcHdDXl1OEV-IwOT4g&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

//   return (
//     <Box sx={{
//       display: 'flex', gap: 4, padding: 4,
//       minHeight: '80vh', backgroundColor: '#f9f9f9'
//     }}>
//       {/* פרטי הזמנה */}
//       <Box sx={{ flex: 1 }}>
//         <Typography variant="h4" gutterBottom>
//           הזמנה נוכחית: {currentOrder.ordername}
//         </Typography>

//         <Card sx={{ padding: 2 }}>
//           <CardContent>
//             <img
//               src={currentOrder.imageUrl}
//               alt={currentOrder.ordername}
//               style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 16 }}
//             />
//             <Typography variant="h5" gutterBottom>{currentOrder.ordername}</Typography>
//             <Typography variant="body1" gutterBottom>{currentOrder.description}</Typography>
//             <Typography variant="body1" gutterBottom>
//               כתובת: {currentOrder.address.city}, {currentOrder.address.street}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               סטטוס: {currentOrder.status}
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleDelivered}
//               sx={{ mt: 2 }}
//             >
//               הזמנה נמסרה!
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* מפה */}
//       <Box sx={{ flex: 1 }}>
//         <iframe
//           title="Google Directions Map"
//           width="100%"
//           height="100%"
//           style={{ border: 0, minHeight: '500px', borderRadius: 8 }}
//           loading="lazy"
//           allowFullScreen
//           referrerPolicy="no-referrer-when-downgrade"
//           src={mapSrc}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default DeliverActiveOrder;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDeliverActiveStatus } from '../../redux/tokenSlice';
import {
  Card, CardContent, Typography, Button,
  Box, CircularProgress, Alert
} from '@mui/material';

const DeliverActiveOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deliverId = useSelector((state) => state.auth.user?._id);
  const token = useSelector((state) => state.auth.accessToken);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deliverInfo, setDeliverInfo] = useState(null);

  const fetchDeliverAndOrder = async () => {
    if (!deliverId) {
      setError('לא נמצא מזהה השליח.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const deliverRes = await axios.get(
        `http://localhost:1700/api/deliver/${deliverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const deliver = deliverRes.data;
      setDeliverInfo(deliver);
      

      if (!deliver.currentOrder) {
        setCurrentOrder(null);
        setError('לשליח אין הזמנה פעילה כרגע.');
        setLoading(false);
        return;
      }

      const orderRes = await axios.get(
        `http://localhost:1700/api/order/${deliver.currentOrder}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentOrder(orderRes.data);
    } catch (err) {
      console.error("שגיאה בקבלת מידע:", err.response?.data || err.message);
      setError('שגיאה בטעינת פרטי השליח או ההזמנה.');
      setCurrentOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliverAndOrder();
  }, [deliverId]);

  const handleDelivered = async () => {
    if (!currentOrder || !deliverId) return;

    try {
      // עדכון סטטוס ההזמנה
      await axios.put(
        "http://localhost:1700/api/order",
        {
          _id: currentOrder._id,
          status: "Delivered",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // עדכון סטטוס השליח (שדות נחוצים בלבד)
      await axios.put(
        "http://localhost:1700/api/deliver",
        {
          _id: deliverId,
          username : deliverInfo.username,
          name : deliverInfo.name,
          city : deliverInfo.city,
          currentOrder: null,
          active: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // בקשה מחודשת לשליח
      const updatedDeliverRes = await axios.get(
        `http://localhost:1700/api/deliver/${deliverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedDeliver = updatedDeliverRes.data;

      dispatch(setDeliverActiveStatus({
        currentOrder: updatedDeliver.currentOrder,
        active: updatedDeliver.active,
      }));

      // ניווט כללי לדף השליח (משם תתבצע ההפניה לפי סטטוס)
      navigate('/Deliver');

    } catch (err) {
      console.error("שגיאה בסיום ההזמנה:", err.response?.data || err.message);
      alert("שגיאה בעדכון סטטוס המסירה.");
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box>;
  if (!currentOrder) return <Box sx={{ mt: 4 }}><Alert severity="info">אין לך הזמנה פעילה כרגע.</Alert></Box>;

  const origin = "תל אביב, הרצל 10";
  const destination = `${currentOrder.address.street}, ${currentOrder.address.city}`;
  const mapSrc = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBemub5ocEI15R6rwcHdDXl1OEV-IwOT4g&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

  return (
    <Box sx={{
      display: 'flex', gap: 4, padding: 4,
      minHeight: '80vh', backgroundColor: '#f9f9f9'
    }}>
      {/* פרטי הזמנה */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          הזמנה נוכחית: {currentOrder.ordername}
        </Typography>

        <Card sx={{ padding: 2 }}>
          <CardContent>
            <img
              src={currentOrder.imageUrl}
              alt={currentOrder.ordername}
              style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 16 }}
            />
            <Typography variant="h5" gutterBottom>{currentOrder.ordername}</Typography>
            <Typography variant="body1" gutterBottom>{currentOrder.description}</Typography>
            <Typography variant="body1" gutterBottom>
              כתובת: {currentOrder.address.city}, {currentOrder.address.street}
            </Typography>
            <Typography variant="body1" gutterBottom>
              סטטוס: {currentOrder.status}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelivered}
              sx={{ mt: 2 }}
            >
              הזמנה נמסרה!
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* מפה */}
      <Box sx={{ flex: 1 }}>
        <iframe
          title="Google Directions Map"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '500px', borderRadius: 8 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
        />
      </Box>
    </Box>
  );
};

export default DeliverActiveOrder;

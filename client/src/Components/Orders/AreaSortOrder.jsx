
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import Avatar from '@mui/material/Avatar';
// import ShareIcon from '@mui/icons-material/Share';
// import DeliverOrder from '../Delivers/DeliverOrder';

// const AreaSortOrder = () => {
//   const city = useSelector(state => state.token.city);
//   const deliver = useSelector(state => state.token); 
//   const name= useSelector(state => state.token.name); // אופציונלי: אם צריך את שם המשתמש
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [show2, setShow2] = useState(false);
//   const [updateOrder, setUpdateOrder] = useState(null);
//   const [delivers, setDelivers] = useState([]); // אופציונלי: שמירת רשימת שליחים

//   // מביא את ההזמנות לעיר הנוכחית
//   const fetchOrders = async () => {
//     if (!city) return;
//     try {
//       setLoading(true);
//       setError('');
//       const response = await axios.get(`http://localhost:1700/api/order/city/${city}`);
//       const filteredOrders = response.data.filter(order => order.status==="Awaiting delivery"); // מסנן את ההזמנות לפי שם המשתמש
//       setOrders(filteredOrders);
//     } catch (err) {
//       console.error(err);
//       setError('נכשלה טעינת ההזמנות');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // פונקציה אופציונלית שמביאה את רשימת השליחים מהשרת (אם צריך)
//   const fetchDelivers = async () => {
//     try {
//       const response = await axios.get('http://localhost:1700/api/deliver');
//       setDelivers(response.data);
//     } catch (error) {
//       console.error("Error fetching delivers", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     // הפעל רק אם צריך לעדכן גם את רשימת השליחים במסך זה
//     // fetchDelivers();
//   }, [city]);

//   if (!city) return <div style={{ color: 'gray' }}>loading...</div>;
//   if (loading) return <div>טוען נתונים...</div>;
//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '32px',
//         justifyContent: 'center',
//         padding: '24px',
//         backgroundColor: '#f5f5f5',
//       }}
//     >
//       {orders.map((order) => (
//         <Card
//           key={order._id}
//           sx={{
//             width: 400,
//             position: 'relative',
//             margin: 2,
//             boxShadow: 4,
//             borderRadius: 3,
//             transition: 'transform 0.3s, box-shadow 0.3s',
//             '&:hover': {
//               transform: 'scale(1.08)',
//               boxShadow: 8,
//             },
//           }}
//         >
//           <Avatar
//             sx={{
//               bgcolor: red[500],
//               position: 'absolute',
//               top: 16,
//               left: 16,
//               width: 48,
//               height: 48,
//               fontSize: 20,
//               zIndex: 1,
//             }}
//           >
//             {order.ordername.charAt(0)}
//           </Avatar>

//           <CardMedia
//             component="img"
//             height="200"
//             image={order.imageUrl}
//             alt={order.ordername}
//             sx={{
//               objectFit: 'cover',
//               borderRadius: '4px 4px 0 0',
//               width: '100%',
//             }}
//           />

//           <CardContent>
//             <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//               {order.ordername}
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ marginTop: 2, textAlign: 'center' }}
//             >
//               {order.description}
//             </Typography>
//           </CardContent>

//           <IconButton
//             aria-label="take"
//             onClick={() => {
//               setUpdateOrder(order);
//               setShow2(true);
//             }}
//           >
//             <ShareIcon sx={{ color: '#64B5F6' }} />
//           </IconButton>
//         </Card>
//       ))}

//       {/* דיאלוג לקיחת הזמנה */}
//       <DeliverOrder
//         fetchOrders={fetchOrders}
//         fetchDelivers={fetchDelivers} // אפשרי, תעביר אם יש צורך לעדכן רשימת שליחים
//         updateOrder={updateOrder}
//         deliver={deliver}
//         setShow2={setShow2}
//         show2={show2}
//       />
//     </div>
//   );
// };

// export default AreaSortOrder;

// client/src/Components/Orders/AreaSortOrder.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share'; // שימי לב שזה אייקון "Share", לא "Take"
import DeliverOrder from '../Delivers/DeliverOrder';

const AreaSortOrder = () => {
  // קבלת כל אובייקט המשתמש מ-state.auth.user
  const deliver = useSelector(state => state.auth.user);
  // קבלת העיר מאובייקט השליח
  // const name = deliver?.name; // אם צריך את שם המשלוחן, הוא כבר בתוך אובייקט deliver
  const accessToken = useSelector(state => state.auth.accessToken);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [show2, setShow2] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(null);

  // מביא את ההזמנות לעיר הנוכחית
  const fetchOrders = async () => {
    if (!deliver.city) {
      setLoading(false); // אם אין עיר, סיים טעינה
      setError('לא ניתן לטעון הזמנות ללא עיר מוגדרת.');
      return;
    }
        if (!accessToken) {
        setLoading(false);
        setError('שגיאת הרשאה: טוקן גישה חסר. אנא התחבר מחדש.');
        console.error("Access Token is missing for fetching orders.");
        return;
    }

    try {
      setLoading(true);
      setError('');
      // חשוב: לוודא שהכתובת תקינה - חסר https:// או http://
  const response = await axios.get(`http://localhost:1700/api/order/city/${deliver.city}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const filteredOrders = response.data.filter(order => order.status === "Awaiting delivery"); // מסנן את ההזמנות לפי סטטוס
      setOrders(filteredOrders);
    } catch (err) {
      console.error("Error fetching orders:", err.response ? err.response.data : err.message);
      setError('נכשלה טעינת ההזמנות');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [deliver.city]); // תלות ב-city

  if (!deliver.city) return <div style={{ color: 'gray' }}>ממתין למידע על עיר...</div>;
  if (loading) return <div>טוען נתונים...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (orders.length === 0) return <div>אין הזמנות פנויות בעיר שלך כרגע.</div>;


  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {orders.map((order) => (
        <Card
          key={order._id}
          sx={{
            width: 400,
            position: 'relative',
            margin: 2,
            boxShadow: 4,
            borderRadius: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.08)',
              boxShadow: 8,
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
            {order.ordername.charAt(0)}
          </Avatar>

          <CardMedia
            component="img"
            height="200"
            image={order.imageUrl}
            alt={order.ordername}
            sx={{
              objectFit: 'cover',
              borderRadius: '4px 4px 0 0',
              width: '100%',
            }}
          />

          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {order.ordername}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginTop: 2, textAlign: 'center' }}
            >
              {order.description}
            </Typography>
          </CardContent>

          <IconButton
            aria-label="take"
            onClick={() => {
              setUpdateOrder(order);
              setShow2(true);
            }}
          >
            {/* זהו אייקון Share. אולי כדאי לשנות לאייקון אחר שמתאים ל"לקחתי הזמנה" */}
            <ShareIcon sx={{ color: '#64B5F6' }} /> 
          </IconButton>
        </Card>
      ))}

      {/* דיאלוג לקיחת הזמנה */}
      {show2 && ( // הצג רק אם show2 הוא true
        <DeliverOrder
          fetchOrders={fetchOrders}
          updateOrder={updateOrder}
          deliver={deliver} // מעביר את אובייקט ה-deliver המלא מה-Redux
          setShow2={setShow2}
          show2={show2}
        />
      )}
    </div>
  );
};

export default AreaSortOrder;
// import { createSlice } from '@reduxjs/toolkit'
// const i={
// token:null,
// user:{},
// role:"",
// city:""
// ,name:"",
// active:false
// }
// const tokenSlice = createSlice({
//     name: 'token',
//     initialState: i,
//     reducers: {
//         setToken(state, action) {
//             state.token = action.payload
//         },
//         setUser(state, action) {
//             state.user = action.payload
//         },
//         setRole(state, action) {
//             state.role = action.payload
//         },
//         setCity(state, action) {      
//             state.city = action.payload
//         },
//         setName(state, action) {      
//             state.name = action.payload
//         },
//         setActive(state, action) {      
//             state.active = action.payload
//         },
//         logOut(state, action) {
//             state.token = null;
//             state.user = null;
//             state.role = null;
//             state.city = "";

//         }
//     }
// })

// export const { setToken, logOut,setUser,setRole,setCity,setActive,setName} = tokenSlice.actions
// export default tokenSlice.reducer

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   // נתוני האימות הכלליים
//   accessToken: null, // במקום token, שם יותר מדויק
//   // נתוני המשתמש עצמו
//   user: {
//     _id: null, // נשמור גם את ה-ID של המשתמש/שליח
//     username: null,
//     role: null,
//     name: null,
//     city: null,
//     active: false, // עבור משלוחנים
//     currentOrder: null, // עבור משלוחנים תפוסים - ID של ההזמנה
//     // ... כל שדות אחרים של המשתמש/שליח שאת צריכה
//   }
// };

// const tokenSlice = createSlice({
//   name: 'auth', // שינוי השם ל-auth, יותר כללי
//   initialState,
//   reducers: {
//     // פעולה אחת שתעדכן את כל נתוני האימות והמשתמש
//     setAuth: (state, action) => {
//       // action.payload יכיל את כל הנתונים מהשרת
//       state.accessToken = action.payload.accessToken || null;
      
//       // עדכון אובייקט ה-user
//       state.user = {
//         _id: action.payload.user?._id || null,
//         username: action.payload.user?.username || null,
//         role: action.payload.role || null, // Role מגיע ישירות מה-payload
//         name: action.payload.name || null, // Name מגיע ישירות מה-payload
//         city: action.payload.user?.city || null, // City מגיע מתוך user object
//         active: action.payload.active !== undefined ? action.payload.active : false, // active מגיע ישירות מה-payload, עם ברירת מחדל
//         currentOrder: action.payload.currentOrder || null, // currentOrder מגיע ישירות מה-payload
//         // ... וודאי שכל השדות שאת צריכה לעדכן נמצאים כאן ומטופלים מה-payload
//       };
//     },
//     // פעולה לטיפול ספציפי בשינוי סטטוס active (לנוחות בעתיד)
//     setDeliverActiveStatus: (state, action) => {
//         state.user.active = action.payload.active;
//         state.user.currentOrder = action.payload.currentOrder || null;
//     },
//     clearAuth: (state) => {
//       state.accessToken = null;
//       state.user = {
//         _id: null,
//         username: null,
//         role: null,
//         name: null,
//         city: null,
//         active: false,
//         currentOrder: null,
//       };
//     }
//   }
// });

// // שינוי השמות של האקשנים לייצוא
// export const { setAuth, setDeliverActiveStatus, clearAuth } = tokenSlice.actions;
// // שינוי הייצוא של ה-reducer
// export default tokenSlice.reducer;

// client/src/redux/tokenSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     accessToken: null,
//     user: {
//         _id: null,
//         username: null,
//         role: null,
//         name: null,
//         city: null,
//         active: false, 
//         currentOrder: null, // ID של ההזמנה הנוכחית אם יש
//     }
// };

// const tokenSlice = createSlice({
//     name: 'auth', 
//     initialState,
//     reducers: {
//         setAuth: (state, action) => {
          
//             state.accessToken = action.payload.accessToken || null;

            
//             state.user = {
//                 _id: action.payload.user?._id || null,
//                 username: action.payload.user?.username || null,
//                 role: action.payload.user?.roles || null,
//                 name: action.payload.user?.name || null,
//                 city: action.payload.user?.city || null,
//                 active: action.payload.user?.active !== undefined ? action.payload.user.active : false,
//                 currentOrder: action.payload.user?.currentOrder || null, // ID של ההזמנה הנוכחית אם יש
//             };
//         },
//         setDeliverActiveStatus: (state, action) => {
//             state.user.active = action.payload.active;
//             state.user.currentOrder = action.payload.currentOrder || null;
//         },
//         clearAuth: (state) => {
//             // פעולה לניקוי נתוני האימות
//             state.accessToken = null;
//             state.user = {
//                 _id: null,
//                 username: null,
//                 role: null,
//                 name: null,
//                 city: null,
//                 active: false,
//                 currentOrder: null,
//             };
//         }
//     }
// });

// export const { setAuth, setDeliverActiveStatus, clearAuth } = tokenSlice.actions;
// export default tokenSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user: {
        _id: null,
        username: null,
        role: null,
        name: null,
        city: null,
        active: false, 
        currentOrder: null, // ID של ההזמנה הנוכחית אם יש
    }
};

const tokenSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        setAuth: (state, action) => {
          
            state.accessToken = action.payload.accessToken || null;

            
            state.user = {
                _id: action.payload.user?._id || null,
                username: action.payload.user?.username || null,
                role: action.payload.user?.roles || null,
                name: action.payload.user?.name || null,
                city: action.payload.user?.city || null,
                active: action.payload.user?.active !== undefined ? action.payload.user.active : false,
                currentOrder: action.payload.user?.currentOrder || null, // ID של ההזמנה הנוכחית אם יש
            };
        },
        setDeliverActiveStatus: (state, action) => {
            state.user.active = action.payload.active;
            state.user.currentOrder = action.payload.currentOrder || null;
        },
        clearAuth: (state) => {
            // פעולה לניקוי נתוני האימות
            state.accessToken = null;
            state.user = {
                _id: null,
                username: null,
                role: null,
                name: null,
                city: null,
                active: false,
                currentOrder: null,
            };
        },
          logOut: (state) => {
      state.accessToken = null;
      state.user = {
        _id: null,
        username: null,
        role: null,
        name: null,
        city: null,
        active: false,
        currentOrder: null,
      };
    },
    }
});

export const { setAuth, setDeliverActiveStatus, clearAuth ,logOut} = tokenSlice.actions;
export default tokenSlice.reducer;
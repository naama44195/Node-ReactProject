// import { configureStore } from '@reduxjs/toolkit'
// import tokenSlice from './tokenSlice'

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';


// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedTokenReducer = persistReducer(persistConfig, tokenSlice);

// const store = configureStore({
//   reducer: {
//     token: persistedTokenReducer, // Persisted token reducer
   
//   },
// });

// const persistor = persistStore(store);

// export { store, persistor };

// client/src/redux/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import tokenSlice from './tokenSlice'; // זה ה-reducer שייצאת מ-tokenSlice.jsx

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';


// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedTokenReducer = persistReducer(persistConfig, tokenSlice);

// const store = configureStore({
//   reducer: {
//     auth: persistedTokenReducer, // <--- שנה את 'token' ל-'auth' כאן!
//   },
// });

// const persistor = persistStore(store);

// export { store, persistor };

// client/src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './tokenSlice'; // מייבא את ה-reducer שייצא מ-tokenSlice.js

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    // אם יש לך חלקים ב-state שאת לא רוצה לשמור, את יכולה להוסיף כאן blacklist או whitelist
};

const persistedTokenReducer = persistReducer(persistConfig, tokenSlice);

const store = configureStore({
    reducer: {
        auth: persistedTokenReducer, // השם של ה-reducer ב-store צריך להיות תואם לשם ה-slice ('auth')
    },
    // חשוב: הסירי את serializableCheck: false אם הוספת אותו באופן זמני.
    // Redux Toolkit אוכף בדיקות סריאליזציה כדי למנוע טעויות.
    // אם התיקונים למעלה פועלים, לא אמורה להיות שגיאה.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // פעולות של Redux-persist לא צריכות להיבדק
                // אם יש עוד פעולות שיכולות להכיל ערכים לא סריאליזבילים באופן לגיטימי, הוסף אותן כאן
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
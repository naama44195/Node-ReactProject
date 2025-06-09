// import React, { useState } from 'react';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useDispatch } from 'react-redux';
// import { setToken, setUser, setRole, setCity,setActive,setName } from '../../redux/tokenSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();

//   const login = async () => {
//     try {
//       const user = { username, password };

//       const response = await axios.post('http://localhost:1700/api/auth/login', user);
//       console.log("USER FROM SERVER:", response.data.user);
//       console.log("TOKEN FROM SERVER:", response.data.accessToken);

//       dispatch(setToken(response.data.accessToken));
//       dispatch(setUser(response.data.user));
//       dispatch(setRole(response.data.role));
//       dispatch(setActive(response.data.active));
//       dispatch(setName(response.data.name));
//       dispatch(setCity(response.data.user.city));
//       if (response.data.user && response.data.user.city) {
//         console.log("Setting city in Redux:", response.data.user.city);

        
//       }

//       if (response.data.role === "Deliver") {
//         if(response.data.active==false){
//         navigate("/Deliver");}
//         if(response.data.active==true){
//           navigate("/Deliver/myOrder");}
//       }
//       if (response.data.role === "Admin") {
//         navigate("/Admin");
//       }
//       if (response.data.role === "Shop") {
//         navigate("/Shop");
//       }
//       setSuccessMessage("Logged in successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000); // הודעת הצלחה נעלמת אחרי 3 שניות
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         setErrorMessage("Invalid username or password.");
//         setUsername("");
//         setPassword("");
//       } else if (err.response && err.response.data && err.response.data.message) {
//         setErrorMessage(err.response.data.message);
//       } else {
//         setErrorMessage("An error occurred. Please try again later.");
//       }
//     }
//   };

//   const handleChange = (e) => {
//     if (errorMessage) {
//       setErrorMessage("");
//     }

//     if (e.target.id === "username") {
//       setUsername(e.target.value);
//     } else if (e.target.id === "password") {
//       setPassword(e.target.value);
//     }
//   };

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5',
//         padding: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           width: { xs: '90%', sm: '400px' },
//           backgroundColor: '#fff',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

//         <FormControl variant="outlined" fullWidth>
//           <InputLabel htmlFor="username">Username</InputLabel>
//           <OutlinedInput
//             id="username"
//             type="text"
//             value={username}
//             onChange={handleChange}
//             label="Username"
//           />
//         </FormControl>

//         <FormControl variant="outlined" fullWidth>
//           <InputLabel htmlFor="password">Password</InputLabel>
//           <OutlinedInput
//             id="password"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={handleChange}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label={
//                     showPassword ? 'hide the password' : 'display the password'
//                   }
//                   onClick={handleClickShowPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>

//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           disableElevation
//           sx={{
//             padding: '10px 0',
//             fontWeight: 'bold',
//             textTransform: 'none',
//           }}
//           onClick={login}
//         >
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

// client/src/Components/Common/Login.jsx

// import React, { useState } from 'react';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useDispatch } from 'react-redux';
// // ייבוא setAuth ו-clearAuth במקום כל הפעולות הנפרדות
// import { setAuth, clearAuth } from '../../redux/tokenSlice'; // וודאי שהנתיב נכון!
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();

//   const login = async () => {
//     try {
//       const userCredentials = { username, password }; // שינוי שם המשתנה מ-user ל-userCredentials

//       const response = await axios.post('http://localhost:1700/api/auth/login', userCredentials);
//       console.log("LOGIN RESPONSE FROM SERVER:", response.data); // נדפיס את כל התגובה כדי לוודא מבנה

//       // שימוש בפעולת setAuth אחת כדי לשמור את כל הנתונים
//       // חשוב לוודא שמבנה ה-response.data מהשרת תואם למצופה ב-tokenSlice.jsx
//       // לדוגמה: { accessToken: "...", user: { _id: "...", username: "...", city: "..."}, role: "...", name: "...", active: true, currentOrder: "..." }
//       dispatch(setAuth(response.data));

//       if (response.data.role === "Deliver") {
//         // תמיד מנווטים ל-/Deliver, ומשם הקומפוננטה Delivers תקבע מה להציג
//         navigate("/Deliver");
//       } else if (response.data.role === "Admin") {
//         navigate("/Admin");
//       } else if (response.data.role === "Shop") {
//         navigate("/Shop");
//       }

//       setSuccessMessage("התחברת בהצלחה!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       console.error("Login error:", err.response ? err.response.data : err.message);
//       if (err.response && err.response.status === 401) {
//         setErrorMessage("שם משתמש או סיסמה שגויים.");
//         setUsername("");
//         setPassword("");
//       } else if (err.response && err.response.data && err.response.data.message) {
//         setErrorMessage(err.response.data.message);
//       } else {
//         setErrorMessage("אירעה שגיאה. אנא נסה שוב מאוחר יותר.");
//       }
//     }
//   };

//   const handleChange = (e) => {
//     if (errorMessage) {
//       setErrorMessage("");
//     }
//     if (e.target.id === "username") {
//       setUsername(e.target.value);
//     } else if (e.target.id === "password") {
//       setPassword(e.target.value);
//     }
//   };

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5',
//         padding: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           width: { xs: '90%', sm: '400px' },
//           backgroundColor: '#fff',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

//         <FormControl variant="outlined" fullWidth>
//           <InputLabel htmlFor="username">Username</InputLabel>
//           <OutlinedInput
//             id="username"
//             type="text"
//             value={username}
//             onChange={handleChange}
//             label="Username"
//           />
//         </FormControl>

//         <FormControl variant="outlined" fullWidth>
//           <InputLabel htmlFor="password">Password</InputLabel>
//           <OutlinedInput
//             id="password"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={handleChange}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label={
//                     showPassword ? 'hide the password' : 'display the password'
//                   }
//                   onClick={handleClickShowPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>

//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           disableElevation
//           sx={{
//             padding: '10px 0',
//             fontWeight: 'bold',
//             textTransform: 'none',
//           }}
//           onClick={login}
//         >
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/tokenSlice'; // וודאי שהנתיב נכון!
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const login = async () => {
        try {
            const userCredentials = { username, password };

            const response = await axios.post('http://localhost:1700/api/auth/login', userCredentials);
            console.log("LOGIN RESPONSE FROM SERVER:", response.data); // נדפיס את כל התגובה כדי לוודא מבנה

            // שימוש בפעולת setAuth אחת כדי לשמור את כל הנתונים
            // response.data מכיל כעת: { accessToken: "...", user: { _id: "...", username: "...", roles: "...", name: "...", city: "...", active: true, currentOrder: "..." } }
            dispatch(setAuth(response.data));

            // גישה לתפקיד מתוך אובייקט ה-user ב-response.data
            const userRole = response.data.user?.roles; // גישה בטוחה לשדה roles בתוך user
            const userActive = response.data.user?.active; // גישה בטוחה לשדה active בתוך user

            if (userRole === "Deliver") {
                if(userActive === false){
                    navigate("/Deliver/myOrder");
                    console.log(response.data)
                }
                else{
                    navigate("/Deliver");
                }
            } else if (userRole === "Admin") {
                navigate("/Admin");
            } else if (userRole === "Shop") {
                navigate("/Shop");
            } else {
                // מקרה ברירת מחדל אם התפקיד לא זוהה או חסר
                navigate("/");
            }

            setSuccessMessage("התחברת בהצלחה!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            if (err.response && err.response.status === 401) {
                setErrorMessage("שם משתמש או סיסמה שגויים.");
                setUsername("");
                setPassword("");
            } else if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("אירעה שגיאה. אנא נסה שוב מאוחר יותר.");
            }
        }
    };

    const handleChange = (e) => {
        if (errorMessage) {
            setErrorMessage("");
        }
        if (e.target.id === "username") {
            setUsername(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: { xs: '90%', sm: '400px' },
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        type="text"
                        value={username}
                        onChange={handleChange}
                        label="Username"
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableElevation
                    sx={{
                        padding: '10px 0',
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                    onClick={login}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
// import { useState } from "react";
// import {
//     Box,
//     TextField,
//     Button,
//     Checkbox,
//     FormControlLabel,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Typography,
//     Divider
// } from "@mui/material";
// import Axios from "axios";

// const AddOrder = ({ show, setShow, shops, setShops, fetchShops }) => {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [phone, setPhone] = useState("")
//     const [address, setAddress] = useState("")



//     const clickClose = () => {
//         setShow(false);
//     };

//     const add = async () => {
//         if (!username.trim() && !password) {
//             alert("username and password are required!");
//             return;
//         }
//         try {
//             const res = await Axios.post("http://localhost:1700/api/shop", {
//                 username,
//                 password: password,
//                 name: name,
//                 email: email,
//                 phone: phone,
//                 address:address,
//                 imageUrl,imgUrl
//             });

//             setOrders([...shops, res.data]);
//             fetchShops();
//             clickClose();
//         } catch (error) {
//             console.error("Error adding order", error);
//         }
//     };

//     return (
//         <Dialog open={show} onClose={clickClose} maxWidth="sm" fullWidth>
//             {/* <DialogTitle
//                 sx={{
//                     backgroundColor: "#4caf50",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     fontSize: "1.6rem",
//                     py: 2,
//                 }}
//             >
//                 Add New Todo
//             </DialogTitle> */}

//             <DialogContent sx={{ py: 4 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
//                     Fill in the details for your task:
//                 </Typography>

//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//                     <TextField
//                         label="Title"
//                         variant="outlined"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         fullWidth
//                     />

//                     <TextField
//                         label="Tags"
//                         variant="outlined"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Tags"
//                         variant="outlined"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Tags"
//                         variant="outlined"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Tags"
//                         variant="outlined"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         fullWidth
//                     />
//                       <TextField
//                         label="Tags"
//                         variant="outlined"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         fullWidth
//                     />


//                 </Box>
//             </DialogContent>

//             <Divider />

//             <DialogActions sx={{ px: 3, pb: 3 }}>
//                 <Button
//                     onClick={clickClose}
//                     variant="outlined"
//                     sx={{
//                         borderRadius: 3,
//                         textTransform: "none",
//                         fontWeight: 500,
//                         color: "#4caf50",
//                         borderColor: "#4caf50",
//                         "&:hover": {
//                             borderColor: "#388e3c",
//                             color: "#388e3c",
//                         },
//                     }}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     onClick={add}
//                     variant="contained"
//                     sx={{
//                         borderRadius: 3,
//                         backgroundColor: "#4caf50",
//                         textTransform: "none",
//                         fontWeight: 600,
//                         "&:hover": {
//                             backgroundColor: "#388e3c",
//                         },
//                     }}
//                 >
//                     Add Deliver
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default AddOrder;

// import { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Typography,
//   Divider
// } from "@mui/material";
// import Axios from "axios";

// const AddOrder = ({ show, setShow, shops, setShops, fetchShops }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   const clickClose = () => {
//     setShow(false);
//   };

//   const add = async () => {
//     if (!username.trim() || !password) {
//       alert("Username and password are required!");
//       return;
//     }

//     const token = useSelector((state) => state.auth?.accessToken)

//     try {
//       const res = await Axios.post("http://localhost:1700/api/shop", {
//         username,
//         password,
//         name,
//         email,
//         phone,
//         address
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setShops([...shops, res.data]); // תיקון מ-setOrders
//       fetchShops();
//       clickClose();
//     } catch (error) {
//       console.error("Error adding shop:", error);
//     }
//   };

//   return (
//     <Dialog open={show} onClose={clickClose} maxWidth="sm" fullWidth>
//       <DialogContent sx={{ py: 4 }}>
//         <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
//           Fill in the shop details:
//         </Typography>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           <TextField
//             label="Username"
//             variant="outlined"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Name"
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Address"
//             variant="outlined"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Phone"
//             variant="outlined"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             fullWidth
//           />
//         </Box>
//       </DialogContent>

//       <Divider />

//       <DialogActions sx={{ px: 3, pb: 3 }}>
//         <Button
//           onClick={clickClose}
//           variant="outlined"
//           sx={{
//             borderRadius: 3,
//             textTransform: "none",
//             fontWeight: 500,
//             color: "#4caf50",
//             borderColor: "#4caf50",
//             "&:hover": {
//               borderColor: "#388e3c",
//               color: "#388e3c",
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={add}
//           variant="contained"
//           sx={{
//             borderRadius: 3,
//             backgroundColor: "#4caf50",
//             textTransform: "none",
//             fontWeight: 600,
//             "&:hover": {
//               backgroundColor: "#388e3c",
//             },
//           }}
//         >
//           Add Shop
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddOrder;


import { useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    TextField,
    Button,
    Checkbox, // זה לא בשימוש, ניתן להסיר
    FormControlLabel, // זה לא בשימוש, ניתן להסיר
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Divider
} from "@mui/material";
import Axios from "axios";

const AddShop = ({ show, setShow, shops, setShops, fetchShops }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(false); // לטיפול במצב טעינה
    const [error, setError] = useState(""); // לטיפול בהודעות שגיאה

    // שינוי כאן: גישה ל-accessToken דרך state.auth.accessToken
    const accessToken = useSelector((state) => state.auth.accessToken);

    const clickClose = () => {
        setShow(false);
        // איפוס שדות לאחר סגירת הדיאלוג
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setError(""); // איפוס הודעת שגיאה
    };

    const add = async () => {
        if (!username.trim() || !password.trim()) { // ודא שגם הסיסמה לא ריקה
            setError("שם משתמש וסיסמה נדרשים!");
            return;
        }
        if (!accessToken) {
            setError("אין טוקן אימות. אנא התחבר כמנהל.");
            return;
        }

        setLoading(true);
        setError(""); // איפוס הודעת שגיאה קודמת

        try {
            const res = await Axios.post(
                "http://localhost:1700/api/shop",
                {
                    username,
                    password,
                    name,
                    email,
                    phone,
                    address,
                    roles: "Shop", // וודא שאת שולחת את התפקיד כ-Deliver
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // שימוש ב-accessToken
                    }
                }
            );
            // setDelivers([...delivers, res.data]); // אם ה-fetchDelivers פועל, לא צריך את זה
            await fetchShops(); // רענן את רשימת המשלוחנים
            clickClose();
        } catch (error) {
            console.error("Error adding shop:", error.response ? error.response.data : error.message);
            setError(`שגיאה בהוספת חנות: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={show} onClose={clickClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1.6rem",
                    py: 2,
                }}
            >
                הוסף חנוץ חדשה
            </DialogTitle>

            <DialogContent sx={{ py: 4 }}>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
                    אנא מלא את פרטי החנות החדשה:
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        label="שם משתמש"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="סיסמה"
                        variant="outlined"
                        type="password" // חשוב להגדיר type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="שם מלא"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="אימייל"
                        variant="outlined"
                        type="email" // חשוב להגדיר type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="טלפון"
                        variant="outlined"
                        type="tel" // חשוב להגדיר type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />
             
                    <TextField
                        label="כתובת"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />
                   
                </Box>
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={clickClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 500,
                        color: "#4caf50",
                        borderColor: "#4caf50",
                        "&:hover": {
                            borderColor: "#388e3c",
                            color: "#388e3c",
                        },
                    }}
                >
                    ביטול
                </Button>
                <Button
                    onClick={add}
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        backgroundColor: "#4caf50",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "#388e3c",
                        },
                    }}
                    disabled={loading} // כפתור מנוטרל בזמן טעינה
                >
                    {loading ? "מוסיף..." : "הוסף משלוחן"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddShop;
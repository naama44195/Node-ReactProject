// import { useState } from "react";
// import { useSelector } from "react-redux";
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

// const AddDeliver = ({ show, setShow, delivers, setDelivers, fetchDelivers }) => {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [phone, setPhone] = useState("")
//     const [area, setArea] = useState("")
//     const [city, setCity] = useState("")
//     const [imageUrl, setImageUrl] = useState("")

//      const token = useSelector((state) => state.token.token);

//     const clickClose = () => {
//         setShow(false);
//     };

// const add = async () => {
//         if (!username.trim() && !password) {
//             alert("username and password are required!");
//             return;
//         }
//         try {
//             const res = await Axios.post(
//                 "http://localhost:1700/api/deliver",
//                 {
//                     username,
//                     password,
//                     name,
//                     email,
//                     phone,
//                     area,
//                     city,
//                     imageUrl
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//         ); setDelivers([...delivers, res.data]);
//             fetchDelivers();
//             clickClose();
//         } catch (error) {
//             console.error("Error adding delivers", error);
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
//                         label="username"
//                         variant="outlined"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         fullWidth
//                     />

//                     <TextField
//                         label="password"
//                         variant="outlined"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="name"
//                         variant="outlined"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="email"
//                         variant="outlined"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="phone"
//                         variant="outlined"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="area"
//                         variant="outlined"
//                         value={area}
//                         onChange={(e) => setArea(e.target.value)}
//                         fullWidth
//                     />
//               <TextField
//                         label="city"
//                         variant="outlined"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="imageURL"
//                         variant="outlined"
//                         value={imageUrl}
//                         onChange={(e) => setImageUrl(e.target.value)}
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

// export default AddDeliver;

// client/src/Components/Admin/AddDeliver .jsx (שים לב לרווח בסוף שם הקובץ שציינת - ייתכן וזה גורם לבעיות ייבוא)

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

const AddDeliver = ({ show, setShow, delivers, setDelivers, fetchDelivers }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [imageUrl, setImageUrl] = useState("");
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
        setArea("");
        setCity("");
        setImageUrl("");
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
                "http://localhost:1700/api/deliver",
                {
                    username,
                    password,
                    name,
                    email,
                    phone,
                    area,
                    city,
                    imageUrl,
                    role: "Deliver", // וודא שאת שולחת את התפקיד כ-Deliver
                    active: true, // משלוחן חדש מתחיל פעיל
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // שימוש ב-accessToken
                    }
                }
            );
            // setDelivers([...delivers, res.data]); // אם ה-fetchDelivers פועל, לא צריך את זה
            await fetchDelivers(); // רענן את רשימת המשלוחנים
            clickClose();
        } catch (error) {
            console.error("Error adding deliver:", error.response ? error.response.data : error.message);
            setError(`שגיאה בהוספת משלוחן: ${error.response?.data?.message || error.message}`);
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
                הוסף משלוחן חדש
            </DialogTitle>

            <DialogContent sx={{ py: 4 }}>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
                    אנא מלא את פרטי המשלוחן החדש:
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
                        label="אזור"
                        variant="outlined"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="עיר"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="URL של תמונה"
                        variant="outlined"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
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

export default AddDeliver;
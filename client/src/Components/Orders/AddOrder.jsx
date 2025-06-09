import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider
} from "@mui/material";
import Axios from "axios";
import { useSelector } from "react-redux";

const AddOrder = ({ show, setShow, fetchOrders }) => {
  const shopNameFromStore = useSelector((state) => state.auth.user?.name || "");
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [shopname, setShopname] = useState(shopNameFromStore);
  const [ordername, setOrdername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setShopname(shopNameFromStore);
  }, [shopNameFromStore]);

  const clickClose = () => {
    setShow(false);
  };

  const add = async () => {
    if (!ordername.trim() || !name.trim() || !shopname.trim() || !address) {
      alert("Order name, customer name, shop name, and address are required!");
      return;
    }

    const parts = address.split(",");
    if (parts.length < 2) {
      alert("Address must be in format: city, street");
      return;
    }

    const Address = {
      city: parts[0].trim(),
      street: parts.slice(1).join(",").trim(),
    };

    if (!accessToken) {
      alert("שגיאת הרשאה: טוקן גישה חסר. אנא התחבר מחדש.");
      return;
    }

    try {
      const res = await Axios.post(
        "http://localhost:1700/api/order",
        {
          ordername,
          status: "Awaiting delivery",
          name,
          shopname,
          delivername: "",
          description: description || "",
          imageUrl: imageUrl || "",
          address: Address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      fetchOrders();
      clickClose();
      alert("ההזמנה נוספה בהצלחה!");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) alert("אין לך הרשאה לבצע פעולה זו.");
        else if (status === 403) alert("אין לך הרשאה להוסיף הזמנות.");
        else alert(`שגיאה: ${error.response.data.message || error.message}`);
      } else {
        alert("אירעה שגיאה ברשת או בשרת.");
      }
    }
  };

  return (
    <Dialog
      open={show}
      onClose={clickClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "linear-gradient(to right, #f9f9f9, #f1f1f1)",
          boxShadow: 10,
          padding: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">
          🛒 הוספת הזמנה חדשה
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, paddingY: 2 }}>
          <TextField
            label="שם ההזמנה"
            variant="outlined"
            value={ordername}
            onChange={(e) => setOrdername(e.target.value)}
            fullWidth
          />
          <TextField
            label="שם הלקוח"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="שם החנות"
            variant="outlined"
            value={shopname}
            disabled
            fullWidth
          />
          <TextField
            label="תיאור (אופציונלי)"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="כתובת (עיר, רחוב ומספר)"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <TextField
            label="קישור לתמונה (אופציונלי)"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />

          {/* תצוגת תמונה (אם הוזן קישור) */}
          {imageUrl && (
            <Box mt={1} textAlign="center">
              <img
                src={imageUrl}
                alt="תצוגה מקדימה"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/naama2.jpg"; // ודא שיש ב-public
                }}
                style={{
                  maxHeight: 160,
                  maxWidth: "100%",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button onClick={clickClose} variant="outlined" color="secondary">
          ביטול
        </Button>
        <Button onClick={add} variant="contained" color="primary">
          הוסף הזמנה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrder;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setDeliverActiveStatus } from '../../redux/tokenSlice';
import {
  Button, Typography, IconButton, DialogTitle,
  DialogContent, DialogActions, Dialog
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DeliverOrder = ({ fetchOrders, updateOrder, setShow2, show2 }) => {
  const dispatch = useDispatch();
  const deliver = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);
  // const deliverID = useSelector((state) => state.auth.user?._id);
  const navigate = useNavigate();


  console.log(token)
  console.log(deliver.role)

  const handleClose = () => setShow2(false);

  const takeOrder = async () => {
    console.log(token)
    console.log(deliver)
    try {
      // שלב 1: עדכון סטטוס ההזמנה ל"In progress"
      await axios.put(
        "http://localhost:1700/api/order",
        {
          ...updateOrder,
          status: "In progress",
          delivername: deliver.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // שלב 2: עדכון השליח במסד נתונים
      await axios.put(
        "http://localhost:1700/api/deliver",
        {
          ...deliver,
          currentOrder: updateOrder._id,
          active: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // const deliver1 = await axios.get(
      //   `http://localhost:1700/api/deliver/${deliverID}`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // const order1 = await axios.get(
      //   `http://localhost:1700/api/order/${deliver.currentOrder}`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // setCurrentDeliver(deliver1)
      // שלב 3: עדכון Redux מקומית
      dispatch(setDeliverActiveStatus({
        currentOrder: updateOrder._id,
        active: false
      }));

      // שלב 4: סגירת החלון וניווט
      await fetchOrders();
      setShow2(false);
      alert("המשלוח נקלט בהצלחה!");
      navigate("/Deliver/myOrder");

    } catch (error) {
      console.error("Error taking order:", error.response ? error.response.data : error.message);
      alert("שגיאה בעדכון ההזמנה או המשלוחן. אנא נסה שוב.");
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} open={show2}>
        <DialogTitle
          sx={{
            m: 0, p: 2, minHeight: '100px',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
          }}
        >
          <Typography variant="h6">{updateOrder.ordername}</Typography>
          <Typography variant="body2" color="text.secondary">{updateOrder.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            כתובת: {updateOrder.address.city}, {updateOrder.address.street}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute', right: 8, top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <img
            src={updateOrder.imageUrl}
            alt="Preview"
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={takeOrder}>לקחתי את המשלוח</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DeliverOrder;


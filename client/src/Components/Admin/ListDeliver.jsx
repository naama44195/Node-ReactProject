// 
// client/src/Components/Admin/ListDeliver.jsx

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';
import AddDeliver from '../Admin/AddDeliver '; // וודאי שהשם והנתיב נכונים (רווח בסוף?)
import { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";

const ListDeliver = () => {
    const [delivers, setDelivers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    // שינוי כאן: גישה ל-accessToken דרך state.auth.accessToken
    const accessToken = useSelector((state) => state.auth.accessToken);

    const fetchDelivers = async () => {
        if (!accessToken) { // ודא שיש טוקן לפני שליחת הבקשה
            console.warn("אין טוקן אימות, לא ניתן לטעון משלוחנים.");
            return;
        }
        try {
            const { data } = await axios.get("http://localhost:1700/api/deliver", {
                headers: {
                    'Authorization': `Bearer ${accessToken}` // שימוש ב-accessToken
                }
            });
            setDelivers(data);
        } catch (error) {
            console.error("Error fetching delivers:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchDelivers();
    }, [accessToken]); // הוספת accessToken כתלות כדי שהרשימה תטען כשיהיה טוקן

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
                ➕ הוסף משלוחן
            </Button>

            {/* מעביר את accessToken כ-prop ל-AddDeliver */}
            <AddDeliver
                show={showAdd}
                setShow={setShowAdd}
                delivers={delivers}
                setDelivers={setDelivers}
                fetchDelivers={fetchDelivers}
                // accessToken={accessToken} // אם AddDeliver לא ניגשת ישירות ל-Redux, ניתן להעביר כ-prop
            />

            <List
                sx={{
                    width: '100%',
                    maxWidth: 700,
                    bgcolor: '#f9fafc',
                    margin: 'auto',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
                    p: 2
                }}
            >
                {delivers.map((deliver, index) => (
                    <React.Fragment key={deliver._id || index}> {/* השתמש ב-ID ייחודי אם קיים */}
                        <ListItem
                            alignItems="flex-start"
                            sx={{
                                '&:hover': { backgroundColor: '#f0f4ff', transition: '0.3s' },
                                borderRadius: 2,
                                mb: 1
                            }}
                        >
                            <ListItemAvatar>
                                {deliver.imageUrl ? (
                                    <Avatar alt={deliver.username} src={deliver.imageUrl} sx={{ width: 56, height: 56 }} />
                                ) : (
                                    <Avatar
                                        sx={{
                                            bgcolor: red[500],
                                            width: 56,
                                            height: 56,
                                            fontSize: 22,
                                            fontWeight: 500
                                        }}
                                    >
                                        {deliver.username ? deliver.username[0].toUpperCase() : '?'}
                                    </Avatar>
                                )}
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 600 }}>
                                        {deliver.username}
                                    </Typography>
                                }
                                secondary={
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            {deliver.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            {deliver.email}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            עיר: {deliver.city}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            אזור: {deliver.area}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            סטטוס: {deliver.active ? "פעיל" : "תפוס"}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>

                        {index !== delivers.length - 1 && (
                            <Divider variant="inset" component="li" sx={{ borderColor: '#e0e0e0' }} />
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

export default ListDeliver;
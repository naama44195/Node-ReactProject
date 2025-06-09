import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Register from './Register';
// import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/tokenSlice';


const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

useEffect(()=>{
    dispatch(logOut())
    navigate('/Login');

},[])
    return (
        <div >

        </div>
    )
}
export default  LogOut ;
   
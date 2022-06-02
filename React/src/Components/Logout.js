import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Logout=(props)=>{
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post("https://localhost:7220/api/user/logout", { withCredentials: true })
        .then(res=> {
            console.log(res);
            props.setLogin("login")
            navigate("/");
        })
    },[])
}
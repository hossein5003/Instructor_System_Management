import React from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { ArrowBack, Delete, Edit } from '@material-ui/icons';
import styled from "styled-components";

const Buttons=({back,handleDelete,id,edit})=>{
    const navigate = useNavigate();

    return(
        <>
            <Button variant="text" onClick={() => navigate(back)}><ArrowBack/></Button>
            <Button variant="contained" color={"error"} onClick={(event) => handleDelete(event, id)}>
                <Delete/>
            </Button>
            <Button variant="contained" color="info" onClick={()=>navigate(`/${edit}/${id}`)}>
                <Edit/>
            </Button>
        </>
    )
}

export default Buttons;
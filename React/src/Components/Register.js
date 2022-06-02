import React, { useState } from "react";
import Header from "./CoreComponents/Header";
import styled from "styled-components";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { FetchPost } from "./CoreComponents/useFetch";
import axios from "axios";

const StyledPaper = styled(Paper)`
    justify-content: center;
    display:flex;
    padding: 25px;
`
const useStyles = makeStyles((theme) => ({
    field: {
        width: "100%",
        marginBottom: "30px",
    },
}));


const Register = () => {
    const classes=useStyles();
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post("https://localhost:7220/api/user/register",{name,password,email})
        .then(res=> {
            console.log(res)
            navigate("/");
        })
        
    };    

    return (
        <>
            <Header title="REGISTER" />
            <StyledPaper>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name"
                    className={classes.field}
                        required
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)}
                    />
                    <TextField
                        label="Email" type="email"
                        className={classes.field}
                        required
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)}
                    />
                    <TextField
                        label="Password" type="password"
                        className={classes.field}
                        required
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)}
                    />

                    <Stack spacing={2} direction="row">
                        <Button variant="text" onClick={() => navigate("/")}>Back</Button>
                        <Button variant="contained" color="success" type={"submit"}>
                            Success
                        </Button>
                    </Stack>
                </form>
            </StyledPaper>
        </>
    )
}

export default Register;
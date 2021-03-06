import React, { useState } from "react";
import Header from "./CoreComponents/Header";
import styled from "styled-components";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
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


const Login = (props) => {
    const classes=useStyles();
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://localhost:7220/api/user/login",{name,password}, { withCredentials: true })
        .then(res=> {
            props.setLogin("logout");
            navigate("/");
        })
    };    

    return (
        <>
            <Header title="LOGIN" />
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

export default Login;
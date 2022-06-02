import React, {useState} from 'react';
import Header from "../CoreComponents/Header";
import {makeStyles, Paper, TextField} from "@material-ui/core";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import * as departmentActions from "../../actions/department";
import {connect} from "react-redux";
import {useToasts} from "react-toast-notifications";

const useStyles = makeStyles((theme) => ({
    field: {
        width: "100%",
        marginBottom: "30px",
    },

    paper: {
        justifyContent: "center",
        display:'flex',
        padding: "25px"
    }
}));

const CreateDepartment = ({...props}) => {
    const {id}=useParams();
    const navigate=useNavigate();
    const {addToast}=useToasts();

    const [department,setDepartment]=useState({
        name:"",
        building:""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const successToast=() =>
            addToast(`Department ${id?"Updated":"Created"} Successfully`, {appearance: "info"});

        props.createDepartment(department, successToast);
        navigate("/departments");
    }

    const handleChange = (event, property) => {
        setDepartment({...department, [property]: event.target.value});
    }

    const classes=useStyles();
    return (
        <>
            <Header title={`${id ? "Update" : "Create"} Department`}/>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name"
                               required
                               value={department.name}
                               onChange={(event) =>
                                   handleChange(event, "name")}
                               className={classes.field}
                    />
                    <TextField
                        required
                        label="Building Name"
                        InputLabelProps={{shrink: true,}}
                        value={department.building}
                        onChange={(event) =>
                            handleChange(event, "building")}
                        className={classes.field}
                    />

                    <Stack spacing={2} direction="row">
                        <Button variant="text" onClick={() => navigate("/departments")}>Back</Button>
                        <Button variant="contained" color="success" type={"submit"}>
                            Success
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </>
    )
}

const mapStateToProps = State => ({

});

const mapActionsToProps = {
    createDepartment: departmentActions.createApi,
};

export default connect(mapStateToProps,mapActionsToProps)(CreateDepartment);
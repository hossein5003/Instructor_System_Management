import React, {useEffect, useState} from 'react';
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import Button from '@mui/material/Button';
import styled from "styled-components";
import Header from "./Header";
import * as instructorActions from "../actions/instructor";
import * as courseActions from "../actions/course";
import * as departmentActions from "../actions/department";
import {connect} from "react-redux";
import {Autocomplete, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

const StyledBody = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

const useStyles = makeStyles((theme) => ({
    field: {
        width: "70%",
        marginBottom: "30px",
    },

    paper: {
        justifyContent: "center",
        padding: "25px"
    }
}));


const Create = ({...props}) => {
    const navigate=useNavigate();
    const classes = useStyles();
    const coursesList=props.coursesList;
    const departmentList=props.departmentList;
    const {addToast} = useToasts();

    useEffect(()=>{
        props.fetchAllCourses();
        props.fetchAllDepartments();
    },[])

    const [instructor, setInstructor] = useState({
        name: "",
        age: "",
        deptName: "",
        courses: [],
    });

    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        setCourses([...coursesList]);
    },[coursesList])

    const [departments,setDepartments]=useState([]);

    useEffect(()=>{
        setDepartments([...departmentList]);
    },[departmentList])

    const handleChange = (event, property) => {
        setInstructor({...instructor, [property]: event.target.value});
    }

    const handleSelectedCourses=(event , newValue)=>{
        setInstructor({...instructor,courses: newValue})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();

        props.createInstructor(instructor,()=>addToast("Instructor Created Successfully",{appearance: "success"}))
        navigate("/");
    }

    const returnDepartments=(department)=>
        <MenuItem key={department.name} value={department.name}>
            {department.name}({department.building})
        </MenuItem>

    return (
        <>
            <Header title={"Create Instructor"}/>
            <StyledBody>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit}>
                            <TextField label="Name" variant="outlined"
                                       value={instructor.name}
                                       onChange={(event) =>
                                           handleChange(event, "name")}
                                       className={classes.field}
                            />
                            <TextField
                                label="Age" type="number"
                                InputLabelProps={{shrink: true,}}
                                value={instructor.age}
                                onChange={(event) =>
                                    handleChange(event, "age")}
                                className={classes.field}
                            />

                            <FormControl className={classes.field}>
                                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={instructor.deptName}
                                    label="Department"
                                    onChange={(event)=>
                                        handleChange(event,"deptName")}
                                >

                                    {
                                        departments.map(department=>returnDepartments(department))
                                    }

                                </Select>
                            </FormControl>

                            <Autocomplete
                                className={classes.field}
                                multiple
                                id="tags-outlined"
                                options={courses}
                                getOptionLabel={(option) => option.title}
                                filterSelectedOptions
                                disableCloseOnSelect
                                onChange={(
                                    event,
                                    newValue)=>
                                    handleSelectedCourses(event,newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Courses"
                                        placeholder="Add course"
                                    />
                                )}
                            />

                            <Stack spacing={2} direction="row">
                                <Button variant="text" onClick={()=>navigate("/")}>Back</Button>
                                <Button variant="contained" color="success" type={"submit"}>
                                    Success
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </Grid>
            </StyledBody>
        </>
    )
}

const mapStateToProps = State => ({
    coursesList: State.dCandidate.courses,
    departmentList:State.dCandidate.departments
});

const mapActionsToProps = {
    fetchAllCourses: courseActions.fetchAllApi,
    createInstructor:instructorActions.createApi,
    fetchAllDepartments:departmentActions.fetchAllApi,
};

export default connect(mapStateToProps,mapActionsToProps)(Create);
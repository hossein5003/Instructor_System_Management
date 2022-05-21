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


const CreateCourse = ({...props}) => {
    const navigate=useNavigate();
    const classes = useStyles();
    const instructorsList=props.instructorsList;
    const departmentList=props.departmentList;
    const {addToast} = useToasts();

    useEffect(()=>{
        props.fetchAllInstructors();
        props.fetchAllDepartments();
    },[])

    const [course, setCourse] = useState({
        title: "",
        credits: "",
        deptName: "",
        instructors: [],
    });

    const [instructors,setInstructors]=useState([]);

    useEffect(()=>{
        setInstructors([...instructorsList]);
    },[instructorsList])

    const [departments,setDepartments]=useState([]);

    useEffect(()=>{
        setDepartments([...departmentList]);
    },[departmentList])

    const handleChange = (event, property) => {
        setCourse({...course, [property]: event.target.value});
    }

    const handleSelectedCourses=(event , newValue)=>{
        setCourse({...course,instructors: newValue})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();

        props.createCourse(course,()=>addToast("Course Created Successfully",{appearance: "success"}))
        navigate("/courses");
    }

    const returnDepartments=(department)=>
        <MenuItem key={department.name} value={department.name}>
            {department.name}({department.building})
        </MenuItem>

    return (
        <>
            <Header title={"Create Course"}/>
            <StyledBody>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit}>
                            <TextField label="Name" variant="outlined"
                                       Required
                                       value={course.title}
                                       onChange={(event) =>
                                           handleChange(event, "title")}
                                       className={classes.field}
                            />
                            <TextField
                                label="credits" type="number"
                                InputLabelProps={{shrink: true,}}
                                value={course.credits}
                                onChange={(event) =>
                                    handleChange(event, "credits")}
                                className={classes.field}
                            />
                            <FormControl className={classes.field}>
                                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={course.deptName}
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
                                options={instructors}
                                getOptionLabel={(option) => option.name}
                                filterSelectedOptions
                                disableCloseOnSelect
                                onChange={(
                                    event,
                                    newValue)=>
                                    handleSelectedCourses(event,newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Instructors"
                                        placeholder="Assign Instructor"
                                    />
                                )}
                            />

                            <Stack spacing={2} direction="row">
                                <Button variant="text" onClick={()=>navigate("/courses")}>Back</Button>
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
    instructorsList: State.dCandidate.instructors,
    departmentList:State.dCandidate.departments
});

const mapActionsToProps = {
    fetchAllInstructors: instructorActions.fetchAllApi,
    createCourse:courseActions.createApi,
    fetchAllDepartments:departmentActions.fetchAllApi,
};

export default connect(mapStateToProps,mapActionsToProps)(CreateCourse);
import React, {useEffect, useState} from 'react';
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import Button from '@mui/material/Button';
import styled from "styled-components";
import Header from "../CoreComponents/Header";
import * as instructorActions from "../../actions/instructor";
import * as courseActions from "../../actions/course";
import * as departmentActions from "../../actions/department";
import {connect} from "react-redux";
import {Autocomplete, Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {useFetch} from "../CoreComponents/useFetch";

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


const CreateCourse = ({...props}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const {addToast} = useToasts();

    let {state: departments} = useFetch("department");
    departments = Array.isArray(departments) ? departments : []

    let {state: instructors} = useFetch("instructor");
    instructors = Array.isArray(instructors) ? instructors : [];

    const [course, setCourse] = useState({
        title: "",
        deptName: "",
        credits: "",
        instructors: []
    });

    const {state: courseFromDb} = useFetch(`course/${id}`);
    const {title, deptName, credits} = courseFromDb;

    useEffect(() => {
        setCourse({
            title: title ?? "",
            deptName: deptName ?? "",
            credits: credits ?? "",
            instructors: courseFromDb.instructors ?? []
        })
    }, [courseFromDb])

    const handleSubmit = (event) => {
        event.preventDefault();
        const successToast=() =>
            addToast(`Course ${id?"Updated":"Created"} Successfully`, {appearance: "info"});

        if (id)
            props.updateCourse(id, course, successToast);
        else
            props.createCourse(course, successToast)

        navigate("/courses");
    }

    return (
        <>
            <Header title={`${id ? "Update" : "Create"} Course`}/>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name"
                               Required
                               value={course.title}
                               onChange={(event) =>
                                   setCourse({...course,"title": event.target.value})}
                               className={classes.field}
                    />
                    <TextField
                        label="credits" type="number"
                        InputLabelProps={{shrink: true,}}
                        value={course.credits}
                        onChange={(event) =>
                            setCourse({...course,"credits": event.target.value})}
                        className={classes.field}
                    />
                    <FormControl className={classes.field}>
                        <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={course.deptName}
                            label="Department"
                            onChange={(event) =>
                                setCourse({...course,"deptName": event.target.value})}
                        >

                            {
                                departments.map(department => <MenuItem key={department.name}
                                                                        value={department.name}>
                                    {department.name}({department.building})
                                </MenuItem>)
                            }

                        </Select>
                    </FormControl>

                    <Autocomplete
                        className={classes.field}
                        multiple
                        id="tags-outlined"
                        options={instructors}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        filterSelectedOptions
                        disableCloseOnSelect
                        onChange={(
                            event,
                            newValue) =>
                            setCourse({...course, instructors: newValue})}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Instructors"
                                placeholder="Assign Instructor"
                            />
                        )}
                    />

                    <Stack spacing={2} direction="row">
                        <Button variant="text" onClick={() => navigate("/courses")}>Back</Button>
                        <Button variant="contained" color="success" type={"submit"}>
                            Success
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </>
    )
}

const mapStateToProps = State => ({});

const mapActionsToProps = {
    updateCourse:courseActions.updateApi,
    createCourse: courseActions.createApi,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateCourse);
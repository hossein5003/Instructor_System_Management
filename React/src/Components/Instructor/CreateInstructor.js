import React, {useEffect, useState} from 'react';
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import Button from '@mui/material/Button';
import Header from "../CoreComponents/Header";
import * as instructorActions from "../../actions/instructor";
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

const CreateInstructor = ({...props}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const {addToast} = useToasts();

    let {state: departments} = useFetch("department");
    departments = Array.isArray(departments) ? departments : []

    let {state: courses} = useFetch("course");
    courses = Array.isArray(courses) ? courses : [];

    const [instructor, setInstructor] = useState({
        name: "",
        deptName: "",
        age: "",
        courses: []
    });

    const {state: instructorFromDb} = useFetch(`instructor/${id}`);
    const {name, deptName, age} = instructorFromDb;

    useEffect(()=>{
        setInstructor({
            name: name ?? "",
            deptName: deptName ?? "",
            age: age ?? "",
            courses: instructorFromDb.courses ?? []
        })
    },[instructorFromDb])

    const handleSubmit = (event) => {
        event.preventDefault();
        const successToast=() =>
            addToast(`Instructor ${id?"Updated":"Created"} Successfully`, {appearance: "info"});

        if (id)
            props.updateInstructor(id,instructor,successToast);
        else
            props.createInstructor(instructor, successToast)

        navigate("/");
    }

    return (
        <>
            <Header title={`${id ? "Update" : "Create"} Instructor`}/>
            <Paper className={classes.paper}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Name"
                                   value={instructor.name}
                                   onChange={(event) =>
                                       setInstructor({...instructor,"name": event.target.value})}
                                   className={classes.field}
                        />
                        <TextField
                            label="Age" type="number"
                            InputLabelProps={{shrink: true,}}
                            value={instructor.age}
                            onChange={(event) =>
                                setInstructor({...instructor,"age": event.target.value})}
                            className={classes.field}
                        />

                        <FormControl className={classes.field}>
                            <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={instructor.deptName}
                                label="Department"
                                onChange={(event) =>
                                    setInstructor({...instructor,"deptName": event.target.value})}
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
                            options={courses}
                            getOptionLabel={(option) => option.title}
                            value={instructor.courses}
                            filterSelectedOptions
                            disableCloseOnSelect
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(
                                event,
                                newValue) =>
                                setInstructor({...instructor, courses: newValue})}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Courses"
                                    placeholder="Add course"
                                />
                            )}
                        />

                        <Stack spacing={2} direction="row">
                            <Button variant="text" onClick={() => navigate("/")}>Back</Button>
                            <Button variant="contained" color="success" type={"submit"}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </div>
            </Paper>
        </>
    )
}

const mapStateToProps = State => ({});

const mapActionsToProps = {
    createInstructor: instructorActions.createApi,
    updateInstructor:instructorActions.updateApi,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateInstructor);
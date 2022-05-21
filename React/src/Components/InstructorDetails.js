import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/instructor";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import styled from "styled-components";
import SimpleAccordion from "./SimpleAccordion";
import Button from "@mui/material/Button";
import {useToasts} from "react-toast-notifications";

const StyledBody = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

const StyledDiv = styled.div`
  justify-content: center;
`;

const useStyles = makeStyles((theme) => ({
    information: {
        width: "80%",
        margin:"35px auto",
        padding:"15px",
        fontSize:"15px"
    }
}));


const InstructorDetails = ({...props}) => {
    const classes = useStyles();
    const navigate=useNavigate();
    const {addToast} = useToasts();

    const [state, setState] = useState({
        name:"",
        age:"",
        departmentName:"",
        building:"",
        courses:[]
    });

    const {id} = useParams();

    useEffect(() => {
        props.getInstructor(id);
    }, []);

    useEffect(() => {
        if (Object.keys(props.instructor).length !== 0) {
            setState({
                departmentName: props.instructor.department.name,
                building: props.instructor.department.building,
                courses: props.instructor.courses ? props.instructor.courses : [],
                name: props.instructor.name,
                age: props.instructor.age
            });
        }
    }, [props.instructor.department]);

    const handleDelete=(event,id)=>{
        props.deleteInstructor(id,()=>addToast("Instructor Deleted Successfully",{appearance: "success"}));
        navigate("/");
    }

    return (
        <StyledBody>
            <Grid item xs={10}>
                <Button variant="text" onClick={()=>navigate("/")}>Back</Button>
                <Button variant="contained" color={"error"} onClick={(event)=>handleDelete(event,id)}>Delete</Button>
                <Paper>
                    <StyledDiv>
                        <div className={classes.information}>
                            <h1>Personal Information</h1>
                            <h5>Name : {state.name}</h5>
                            <h5>Age : {state.age}</h5>
                            <h1>Department</h1>
                            <h5>Department Name : {state.departmentName}</h5>
                            <h5>Building Name : {state.building}</h5>
                            <h1>Courses</h1>
                            <SimpleAccordion title={"title"} additionalInformation={"credits"} data={state.courses}/>
                        </div>
                    </StyledDiv>
                </Paper>
            </Grid>
        </StyledBody>

    );
}

const mapStateToProps = State => ({
    instructor: State.dCandidate.instructorDetails
});

const mapActionsToProps = {
    getInstructor: actions.getByIdApi,
    deleteInstructor:actions.deleteApi
};

export default connect(mapStateToProps, mapActionsToProps)(InstructorDetails);
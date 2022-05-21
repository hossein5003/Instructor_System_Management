import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/course";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import styled from "styled-components";
import SimpleAccordion from "./SimpleAccordion";
import Accordion from "./SimpleAccordion";
import Button from "@mui/material/Button";

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
        margin: "35px auto",
        padding: "15px",
        fontSize: "15px"
    }
}));


const CourseDetails = ({...props}) => {
    const classes = useStyles();
    const navigate=useNavigate();

    const [state, setState] = useState({
        title: "",
        credits: "",
        departmentName: "",
        building: "",
        instructors: []
    });

    const {id} = useParams();

    useEffect(() => {
        props.getCourse(id);
    }, []);

    useEffect(() => {
        if (Object.keys(props.course).length !== 0) {
            setState({
                departmentName: props.course.department.name,
                building: props.course.department.building,
                instructors: props.course.instructors ? props.course.instructors : [],
                title: props.course.title,
                credits: props.course.credits
            });
        }
    }, [props.course.department]);

    return (
        <StyledBody>
            <Grid item xs={10}>
                <Button variant="text" onClick={() => navigate("/courses")}>Back</Button>
                <Paper>
                    <StyledDiv>
                        <div className={classes.information}>
                            <h1>Course Information</h1>
                            <h5>Title : {state.title}</h5>
                            <h5>Credits : {state.credits}</h5>
                            <h1>Department</h1>
                            <h5>Department Name : {state.departmentName}</h5>
                            <h5>Building Name : {state.building}</h5>
                            <h1>Instructors</h1>
                            <SimpleAccordion title={"name"} additionalInformation={"age"} data={state.instructors}/>
                        </div>
                    </StyledDiv>
                </Paper>
            </Grid>
        </StyledBody>

    );
}

const mapStateToProps = State => ({
    course: State.dCandidate.courseDetails
});

const mapActionsToProps = {
    getCourse: actions.getByIdApi
};

export default connect(mapStateToProps, mapActionsToProps)(CourseDetails);
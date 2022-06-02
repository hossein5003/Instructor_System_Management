import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions/instructor";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import styled from "styled-components";
import SimpleAccordion from "../CoreComponents/SimpleAccordion";

import {useToasts} from "react-toast-notifications";
import {useFetch} from "../CoreComponents/useFetch";
import Buttons from '../CoreComponents/Buttons';


const StyledDiv = styled.div`
  justify-content: center;
`;

const Information=styled.div`
    width: 70%;
    margin: 35px auto;
    padding: 15px;
    font-size: 15px;
`;


const InstructorDetails = ({...props}) => {
    const navigate = useNavigate();
    const {addToast} = useToasts();
    const {id} = useParams();

    const {state} = useFetch(`instructor/${id}`);

    const {name,age,department,courses}=state;

    const handleDelete = (event, id) => {
        props.deleteInstructor(id, () => addToast("Instructor Deleted Successfully", {appearance: "info"}));
        navigate("/");
    }

    return (
        <>
            <Buttons back="/instructors" handleDelete={handleDelete} edit="upsert_instructor" id={id}/>
            <Paper>
                <StyledDiv>
                    <Information>
                        <h1>Personal Information</h1>
                        <h5>Name : {name?name:""}</h5>
                        <h5>Age : {age?age:""}</h5>
                        <h1>Department</h1>
                        <h5>Department Name : {department?department.name:""}</h5>
                        <h5>Building Name : {department?department.building:""}</h5>
                        <h1>Courses</h1>
                        <SimpleAccordion title={"title"} additionalInformation={"credits"} data={courses?courses:[]}/>
                    </Information>
                </StyledDiv>
            </Paper>
        </>
    )
}

const mapStateToProps = State => ({
    instructor: State.dCandidate.instructorDetails
});

const mapActionsToProps = {
    getInstructor: actions.getByIdApi,
    deleteInstructor: actions.deleteApi
};

export default connect(mapStateToProps, mapActionsToProps)(InstructorDetails);
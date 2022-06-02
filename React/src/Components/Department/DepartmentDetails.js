import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import * as courseActions from "../../actions/course";
import * as departmentActions from "../../actions/department";
import * as instructorActions from "../../actions/instructor";
import {connect} from "react-redux";
import {Paper} from "@material-ui/core";
import SimpleAccordion from "../CoreComponents/SimpleAccordion";
import styled from "styled-components";
import {useToasts} from "react-toast-notifications";
import {useFetch} from "../CoreComponents/useFetch";
import axios from "axios";

import Buttons from '../CoreComponents/Buttons';


const StyledDiv = styled.div`
  justify-content: center;
`;

const Information = styled.div`
  width: 70%;
  margin: 35px auto;
  padding: 15px;
  font-size: 15px;
`;

const DepartmentDetails = ({...props}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToast} = useToasts();

    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);

    const {state: department} = useFetch(`department/${id}`)

    useEffect(() => {
        if (department.name) {
            axios.get(`https://localhost:7220/api/instructor/by_name/${department.name}`)
                .then(response => setInstructors([...response.data]))
            axios.get(`https://localhost:7220/api/course/by_name/${department.name}`)
                .then(response => setCourses([...response.data]))
        }
        console.log(department.name)
    }, [department])

    const handleDelete = (event, id) => {
        props.deleteDepartment(id, () => addToast("Department Deleted Successfully", {appearance: "info"}));
        navigate("/departments");
    }

    return (
        <>
            <Buttons back="/departments" handleDelete={handleDelete} edit="upsert_department" id={id}/>
            <Paper>
                <StyledDiv>
                    <Information>
                        <h1>Department Information</h1>
                        <h5>Name : {department.name}</h5>
                        <h5>Building : {department.building}</h5>
                        <h1>Instructors</h1>
                        <SimpleAccordion title={"name"} additionalInformation={"age"} data={instructors}/>
                        <h1>Courses</h1>
                        <SimpleAccordion title={"title"} additionalInformation={"credits"} data={courses}/>
                    </Information>
                </StyledDiv>
            </Paper>
        </>
    );
}

const mapStateToProps = State => ({
    instructors: State.dCandidate.instructors,
    department: State.dCandidate.departmentDetails,
    courses: State.dCandidate.courses
});

const mapActionsToProps = {
    getDepartment: departmentActions.getByIdApi,
    getInstructorsByDeptName: instructorActions.fetchAllByDeptNameApi,
    getCoursesByDeptName: courseActions.fetchAllByDeptNameApi,
    deleteDepartment: departmentActions.deleteApi,
};

export default connect(mapStateToProps, mapActionsToProps)(DepartmentDetails);
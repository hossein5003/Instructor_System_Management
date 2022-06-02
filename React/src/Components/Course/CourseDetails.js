import {connect} from "react-redux";
import * as actions from "../../actions/course";
import {useNavigate, useParams} from "react-router-dom";
import {Paper} from "@material-ui/core";
import styled from "styled-components";
import SimpleAccordion from "../CoreComponents/SimpleAccordion";
import {useToasts} from "react-toast-notifications";
import {useFetch} from "../CoreComponents/useFetch";

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

const CourseDetails = ({...props}) => {
    const navigate = useNavigate();
    const {addToast} = useToasts();
    const {id} = useParams();

    const {state} = useFetch(`course/${id}`);

    const {title, credits, department, instructors} = state;


    const handleDelete = (event, id) => {
        props.deleteCourse(id, () => addToast("Course Deleted Successfully", {appearance: "info"}));
        navigate("/course");
    }

    return (
        <>
            <Buttons back="/courses" handleDelete={handleDelete} edit="upsert_course" id={id}/>
            <Paper>
                <StyledDiv>
                    <Information>
                        <h1>Course Information</h1>
                        <h5>Title : {title ? title : ""}</h5>
                        <h5>Credits : {credits ? credits : ""}</h5>
                        <h1>Department</h1>
                        <h5>Department Name : {department ? department.name : ""}</h5>
                        <h5>Building Name : {department ? department.building : ""}</h5>
                        <h1>Instructors</h1>
                        <SimpleAccordion title={"name"} additionalInformation={"age"}
                                         data={instructors ? instructors : []}/>
                    </Information>
                </StyledDiv>
            </Paper>
        </>
    );
}

const mapStateToProps = State => ({
    course: State.dCandidate.courseDetails
});

const mapActionsToProps = {
    deleteCourse: actions.deleteApi,
    getCourse: actions.getByIdApi
};

export default connect(mapStateToProps, mapActionsToProps)(CourseDetails);
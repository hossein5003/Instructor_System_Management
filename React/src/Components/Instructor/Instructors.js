import React, {useEffect} from "react";
import Header from "../CoreComponents/Header";
import DataTable from "../CoreComponents/DataTable";
import * as actions from "../../actions/instructor";
import {connect} from "react-redux";

const Instructors = ({...props}) => {

    useEffect(() => {
        props.fetchAllInstructors();
    }, []);

    return (
        <>
            <Header title={"INSTRUCTORS"}/>
            <DataTable firstColumn={"name"} secondColumn={"deptName"} data={props.instructorsList} type={'instructor'}/>
        </>
    )
};

const mapStateToProps = State => ({
    instructorsList: State.dCandidate.instructors
});

const mapActionsToProps = {
    fetchAllInstructors: actions.fetchAllApi,
    deleteInstructors: actions.deleteApi,
    createInstructor: actions.createApi
};

export default connect(mapStateToProps, mapActionsToProps)(Instructors);
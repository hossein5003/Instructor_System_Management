import React, {useEffect} from "react";
import Header from "../CoreComponents/Header";
import DataTable from "../CoreComponents/DataTable";
import {connect} from "react-redux";
import * as actions from "../../actions/course";

const Courses=({...props})=>{
    useEffect(() => {
        props.fetchAllCourses();
    }, []);

    return(
        <>
            <Header title={"COURSES"}/>
            <DataTable data={props.coursesList} firstColumn={'title'} secondColumn={'credits'} type={'course'}/>
        </>
    )
}

const mapStateToProps = State => ({
    coursesList: State.dCandidate.courses
});

const mapActionsToProps = {
    fetchAllCourses: actions.fetchAllApi,
    deleteCourses: actions.deleteApi,
    createCourses:actions.createApi
};

export default connect(mapStateToProps, mapActionsToProps)(Courses);
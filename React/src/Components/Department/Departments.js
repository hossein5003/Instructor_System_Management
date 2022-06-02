import React, {useEffect, useState} from 'react';
import * as departmentActions from "../../actions/department";
import {connect} from "react-redux";
import Header from "../CoreComponents/Header";
import DataTable from "../CoreComponents/DataTable";

const Departments = ({...props}) => {
    const {departmentList} = props;

    useEffect(() => {
        props.fetchAllDepartments();
    }, []);

    return (
        <>
            <Header title={'Departments'}/>
            <DataTable firstColumn={"name"} secondColumn={"building"} data={props.departmentList} type={'department'}/>
        </>
    )
}

const mapStateToProps = State => ({
    instructorList: State.dCandidate.instructors,
    courseList: State.dCandidate.courses,
    departmentList: State.dCandidate.departments
});

const mapActionsToProps = {
    fetchAllDepartments: departmentActions.fetchAllApi
};

export default connect(mapStateToProps, mapActionsToProps)(Departments);
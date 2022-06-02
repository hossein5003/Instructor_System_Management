import { store } from "./actions/store";
import { Provider } from "react-redux"
import { ToastProvider } from "react-toast-notifications";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Instructors from "./Components/Instructor/Instructors";
import Courses from "./Components/Course/Courses";
import Login from "./Components/Login";
import CourseDetails from "./Components/Course/CourseDetails";
import InstructorDetails from "./Components/Instructor/InstructorDetails";
import { Container, Grid, Paper } from "@material-ui/core";
import CreateCourse from "./Components/Course/CreateCourse";
import styled from "styled-components";
import React, { useState } from "react";
import Departments from "./Components/Department/Departments";
import CreateDepartment from "./Components/Department/CreateDepartment";
import DepartmentDetails from "./Components/Department/DepartmentDetails";
import UpsertInstructor from "./Components/Instructor/CreateInstructor";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import { Logout } from "./Components/Logout";

const StyledBody = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

function App() {
    const [login,setLogin]=useState("login");
    return (
        <Provider store={store}>
            <ToastProvider autoDismiss={true}>
                <Router>
                    <Navbar login={login}/>
                    <Container>
                        <StyledBody>
                            <Grid item xs={10}>
                                <Routes>
                                    <Route exact path='/' element={<Home />} />
                                    <Route exact path="/instructors" element={<Instructors />} />
                                    <Route exact path="/departments" element={<Departments />} />
                                    <Route exact path="/upsert_department/:id" element={<CreateDepartment />} />
                                    <Route exact path="/upsert_department/" element={<CreateDepartment />} />
                                    <Route exact path="/department/:id" element={<DepartmentDetails />} />
                                    <Route exact path="/courses" element={<Courses />} />
                                    <Route exact path="/login" element={<Login setLogin={setLogin}/>} />
                                    <Route exact path="/logout" element={<Logout setLogin={setLogin}/>} />
                                    <Route exact path="/register" element={<Register />} />
                                    <Route exact path="/course/:id" element={<CourseDetails />} />
                                    <Route exact path="/instructor/:id" element={<InstructorDetails />} />
                                    <Route exact path="/upsert_instructor" element={<UpsertInstructor />} />
                                    <Route exact path="/upsert_instructor/:id" element={<UpsertInstructor />} />
                                    <Route exact path="/upsert_course/:id" element={<CreateCourse />} />
                                    <Route exact path="/upsert_course/" element={<CreateCourse />} />
                                </Routes>
                            </Grid>
                        </StyledBody>
                    </Container>
                    <footer>
                        <Footer/>
                    </footer>
                </Router>
            </ToastProvider>
        </Provider>
    );
}

export default App;

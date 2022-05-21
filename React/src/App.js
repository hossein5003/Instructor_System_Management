import {store} from "./actions/store";
import {Provider} from "react-redux"
import {ToastProvider} from "react-toast-notifications";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Instructors from "./Components/Instructors";
import Courses from "./Components/Courses";
import Login from "./Components/Login";
import CourseDetails from "./Components/CourseDetails";
import InstructorDetails from "./Components/InstructorDetails";
import Create from "./Components/Create";
import {Container} from "@material-ui/core";
import CreateCourse from "./Components/CreateCourse";

function App() {
    return (

        <Provider store={store}>
            <ToastProvider autoDismiss={true}>
                <Router>
                    <Navbar/>
                    <Container>
                        <Routes>
                            <Route exact path="/" element={<Instructors/>}/>
                            <Route exact path="/courses" element={<Courses/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path={"/course/:id"} element={<CourseDetails/>}/>
                            <Route exact path={"/instructor/:id"} element={<InstructorDetails/>}/>
                            <Route exact path={"/instructor"} element={<Create/>}/>
                            <Route exact path={"/course"} element={<CreateCourse/>}/>
                        </Routes>
                    </Container>
                </Router>
            </ToastProvider>
        </Provider>

    );
}

export default App;

import Registration from "../registration";
import Authorization from "../authorization";
import {Route, Routes} from "react-router-dom";
import Start from "../start";
import {useAuth} from "../../context/auth-context";
import FindJobsPage from "../find-jobs-page";
import Header from "../header";
import Footer from "../footer";
import Profile from "../profile";
import ProfileEdit from "../profile-edit";
import ProjectCreate from "../employer/project-create";
import ProjectPage from "../employer/project-page";
import ProjectDetailsEmployer from "../employer/project-details-employer/projectDetailsEmployer";
import ProjectEdit from "../employer/project-edit";
import ProjectDetails from "../project-details";

function App() {

    const {token} = useAuth();
    //   const token = true; //todo : Temporary stub!!!!!!!!!!!!!!

    return (
        <>
            {token && <Header/>}

            <Routes>
                {token ? (
                    <>
                        <Route path="/find-jobs" element={<FindJobsPage/>}/>

                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/edit" element={<ProfileEdit/>}/>

                        <Route path="/projects" element={<ProjectPage/>}/>
                        <Route path="/project/create" element={<ProjectCreate/>}/>
                        <Route path="/project/details/employer/:projectId" element={<ProjectDetailsEmployer/>}/>
                        <Route path="/project/edit/:projectId" element={<ProjectEdit/>}/>

                        <Route path="/project/details/:projectId" element={<ProjectDetails/>}/>

                    </>
                ) : (
                    <>
                        <Route path="/" element={<Start/>}/>
                        <Route path="/authorization" element={<Authorization/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    </>
                )}
            </Routes>

            {token && <Footer/>}
        </>
    )
}

export default App;
import Registration from "../registration";
import Authorization from "../authorization";
import {Route, Routes} from "react-router-dom";
import Start from "../start";
import {useAuth} from "../../context/auth-context";
import Main from "../main";
import Header from "../header";
import Footer from "../footer";
import Profile from "../profile";
import ProfileEdit from "../profile-edit";
import ProjectCreate from "../project-create";
import ProjectPage from "../project-page";

function App() {
    const {token} = useAuth();
    //  const token = true; //todo : Temporary stub!!!!!!!!!!!!!!

    return (
        <>
            {token && <Header/>}

            <Routes>
                {token ? (
                    <>
                        <Route path="/main" element={<Main/>}/>

                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/edit" element={<ProfileEdit/>}/>

                        <Route path="/projects" element={<ProjectPage/>}/>
                        <Route path="/project/create" element={<ProjectCreate/>}/>
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
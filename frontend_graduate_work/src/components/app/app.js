import Registration from "../registration";
import Authorization from "../authorization";
import {Route, Routes} from "react-router-dom";
import Start from "../start";
import {useAuth} from "../../context/auth-context";
import MainPage from "../main-page";

function App() {
    const {token} = useAuth();
    //  const token = true; //todo : Temporary stub!!!!!!!!!!!!!!

    return (
        <>
            <Routes>
                {token ? (
                    <>
                        <Route path="/main" element={<MainPage/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Start/>}/>
                        <Route path="/authorization" element={<Authorization/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    </>
                )}
            </Routes>
        </>
    )
}

export default App;
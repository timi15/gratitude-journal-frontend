import {Routes, Route, Navigate} from "react-router-dom";

import {LogIn} from "./pages/LogIn";
import {SignUp} from "./pages/SignUp";
import {Home} from "./pages/Home";
import {Layout} from "./components/Layout";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {UserController} from "./pages/UserController";

function App() {


    return (

        <Routes>

            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>

            <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/users" element={<UserController/>}/>
            </Route>

        </Routes>

    );
}

export default App;

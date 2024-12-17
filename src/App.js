import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import {Navigate, Outlet} from 'react-router-dom';
import User from "./components/User";
import Admin from "./components/Admin";
import Exam from "./components/Exam";
import HomePage from "./components/User/HomePage";
import Register from "./components/Register";
import AccountInfo from "./components/AccountInfo";
import ChangePasword from "./components/ChangePasword";
import ExamMain from './components/User/ExamMain';
import FeedBack from "./components/FeedBack" 

function App() {
    let checkLogin = sessionStorage.getItem('token') === null ? true : true;
    
   
    function PrivateOutlet() {
        return checkLogin ? <Outlet/> : <Navigate to="/"/>;
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>
                <Route element={<PrivateOutlet/>}>
                    <Route element={<User/>}>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/exam/create" element={<Exam/>}/>
                        <Route path="/feedback" element={<FeedBack/>}/>
                        <Route path="/accInfo" element={<AccountInfo/>}/>
                        <Route path="/changePassword" element={<ChangePasword/>}/>
                    </Route>
                    <Route >
                        <Route path="/examuser" element={<ExamMain/>}/>
                        
                    </Route>
                    
                    <Route path="/admin" element={<Admin/>}>
                        
                    </Route>
                    <Route path="*" element={<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

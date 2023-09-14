import React, { useState } from "react";
import Login from './Login';
import {BrowserRouter,Routes,Route,Link,Navigate} from 'react-router-dom';
import Homepage from "./Homepage";
import './App.css';
import Stu from "./student";
import { Button } from "@mui/material";
import {auth} from './firebase-config';
import {signOut} from 'firebase/auth';
import Authority from "./Authority";
import Hod from './Hod';
import ClassAuth from "./ClassAuth";
import Hodlogin from "./Hodlogin";
import Gate from "./Gate";
import Navbar from "./components/Navbar"
import SignIn from "./Loginn";
const App=()=>{
    const [curruser,setcurruser]=useState("");
    const [isAuth,setIsAuth]=useState(false);
    const logout = async () => {
        await signOut(auth);
        setIsAuth(false);
        window.location.pathname="/";
      };
    return (
        <BrowserRouter>
     
        <Routes>
            <Route path="/"  element={<Homepage/>}/>
        <Route path="/login" element={<SignIn setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/> 
        {/* <Route path="/stu" element={<Stu email={curruser}/>}/>
        <Route path="/auth" element={<Authority />}/> 
        <Route path="/hod" element={<Hod />}/> 
        <Route path="/classauth" element={<ClassAuth />}/> */}
            {(isAuth)  ? <Route path="/stu" element={<Stu email={curruser}/>}/> :<Route path="/stu" element={<SignIn setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>}
            {console.log(curruser)}
            {(isAuth)  ? <Route path="/auth" element={<Authority />}/> :<Route path="/auth" element={<SignIn setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>}
            {(isAuth)  ? <Route path="/hod" element={<Hod />}/> :<Route path="/hod" element={<SignIn setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>}
            {(isAuth)  ? <Route path="/classauth" element={<ClassAuth />}/> :<Route path="/classauth" element={<SignIn setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>}
            {console.log(isAuth)}
        </Routes>   
        </BrowserRouter>
    );
}
export default App;
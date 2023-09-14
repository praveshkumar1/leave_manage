import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {db,auth} from './firebase-config';
import { getDocs,doc,collection,updateDoc } from "firebase/firestore";

import { async } from "@firebase/util";
import BasicSelect from "./components/Select";
import RowAndColumnSpacing from "./components/Grid";
import { Button ,Collapse} from "@mui/material";
import TextField from './components/TextField';
import Alert from '@mui/material/Alert';
import Heading from "./components/Heading";
import Logout from "./components/Logout";
import BigCard from "./components/BigCard";
import './css/Gridcss.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
const Hod=()=>{
    const collectionref=collection(db,"user");
    const [users,setusers]=useState([]);
    const [department,setdepartment]=useState("");
    const [denialreason,setdenialreason]=useState("");
    const[ref,setref]=useState(false);
    const[alert,setalert]=useState(false);
    const[alert1,setalert1]=useState(false);
    const[alert2,setalert2]=useState(false);
    var cnt=0;
    useEffect(()=>{
        const getuser=async()=>{
            try{
            const data=await getDocs(collectionref);
            setusers(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
                    
            
            console.log(users);
            }
            catch(err){
                console.log("error:",err);
            }
        }
        getuser();
    },[ref])
    {console.log(department)}
    const updateyes=async (id,per)=>{
        setref(!ref)
        const userdoc=doc(collectionref,id);
        const change={per_hod:true,
            denialreason:"Sent to JD",
            
        };
        updateDoc(userdoc,change);
        setalert1(true)
    }
    const updateno=(id,per)=>{
        if(denialreason==""){
            console.log("clikc")
            setalert2(true);
        }else{
            setref(!ref)
            const userdoc=doc(collectionref,id);
            const change={per_hod:false
            ,
            denialreason:"Permission denied by HOD  : reason ->"+denialreason
            };
            updateDoc(userdoc,change);
            setalert(true)
        }
       
    }
    const updatedecision=async(id,reason)=>{
        const userdoc=doc(db,"user",id);
        const change={denialreason:reason
        
        };
        updateDoc(userdoc,change)
    }
    
return (
    
    <>
    <Heading title="Hod Dashboard"></Heading>
    <div style={{position:"absolute" ,top:"4.5rem",right:".5rem"}}>
       <Logout></Logout>
       </div>
    <BasicSelect title="Department" val1="CompA" val2="CompB" val3="IT" val4="EntcA" val5="EntcB" val6="Mech" fun={setdepartment} />
    <Collapse in={alert}>
  <Alert severity="info">You have rejected the leave application . </Alert>
{setTimeout( () => setalert(false) , 2500)}
  </Collapse>

  <Collapse in={alert1}>
  <Alert severity="info">You have passed the leave application . </Alert>
{setTimeout( () => setalert1(false) , 2500)}
  </Collapse>
  <Collapse in={alert2}>
                 <Alert severity="error">
                     You have not specified the denial reason  . Please specify it 
                 </Alert>
                 {setTimeout( () => setalert2(false) , 3000)}
             </Collapse>
    {/* <select style={{marginBottom:"1rem"}} name="" id="" onChange={(e)=>{setdepartment(e.target.value)}}>
        <option  value="">Select Branch</option>
        <option value="CompA">Comp A</option>
        <option value="CompB">Comp B</option>
        <option value="It">IT</option>
        <option value="EntcA">EntcA</option>
        <option value="EntcB">EntcB</option>
        <option value="">Mech</option>
    </select> */}

    <div className="block">{users.map((users)=>{
        if(users.branch==department){
            if(users.per_class==true && users.denialreason=="sent to HOD"){

            {cnt++}
            return(
                <div key={users.id}>
                    {/* <div>{users.name}</div>
                    <div>{users.reason}</div>
                    <div>{users.email}</div>
                    <div>{users.startDate}</div>
                    <div>{users.enddate}</div>    
                    {!users.per_class ? <div className="circle_red"></div> : <div className="circle_green"></div> }
        
                    <button onClick={()=>{updateyes(users.id,users.per_hod)}}>YES</button>
                    <button onClick={()=>{updateno(users.id,users.per_hod)}}>NO</button>
                    <input type="text" placeholder="reason of denial" onChange={(e)=>{setdenialreason(e.target.value)}}/>
                    <button onClick={()=>{updatedecision(users.id,denialreason)}}>OK</button> */}
                 {/* <RowAndColumnSpacing name={users.name} reason={users.reason} startDate={users.startDate} endDate={users.enddate} yes={<Button variant="contained" onClick={()=>{updateyes(users.id,users.per_class)}}>Yes</Button>} no={<Button variant="contained" onClick={()=>{updateno(users.id,users.per_class)}}>No</Button>} denialreason={<TextField title="denial reason" fun={setdenialreason}/>}/> */}
                <BigCard name={users.name} reason={users.reason} startDate={users.startDate} endDate={users.enddate} regno={users.regno} year={users.year} yes={<Button variant="contained" sx={{width:"100px" ,height:"40px"}} onClick={()=>{updateyes(users.id,users.per_class)}}>Yes <CheckCircleIcon sx={{color:"white"}}></CheckCircleIcon></Button>} no={<Button variant="contained" color="error" sx={{width:"100px" ,height:"40px"}} onClick={()=>{updateno(users.id,users.per_class)}}>No <CancelIcon sx={{color:"white"}}></CancelIcon></Button>} denialreason={<TextField title="denial reason" fun={setdenialreason} />}></BigCard>
                </div>
                
            );
        }
    }
       
    })}</div>
    {(cnt)?<div></div>:<div><Alert severity="info">No Application Pending</Alert></div>}
    </>
);
}
export default Hod;
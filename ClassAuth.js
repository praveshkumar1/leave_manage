import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {db,auth} from './firebase-config';
import { getDocs,doc,collection,updateDoc } from "firebase/firestore";

import BasicSelect from "./components/Select";
import RowAndColumnSpacing from './components/Grid';
import TextField from './components/TextField'
import { Collapse,Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import BigCard from "./components/BigCard";
import Heading from './components/Heading';
import Logout from './components/Logout';
//import './css/Gridcss.css';
import './index.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
const ClassAuth=()=>{



    const collectionref=collection(db,"user");
    const [users,setusers]=useState([]);
    var cnt=0;
    const [denialreason,setdenialreason]=useState("");
    const [department,setdepartment]=useState("");
    const[ref,setref]=useState(false);
    const[alert,setalert]=useState(false);
    const[alert1,setalert1]=useState(false);
    const[alert2,setalert2]=useState(false);
    useEffect(()=>{
        const getuser=async()=>{
            try{
            const data=await getDocs(collectionref);
            setusers(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
                    
            console.log("done");
            console.log(users);
            }
            catch(err){
                console.log("error:",err);
             <Collapse in={true}>
             <Alert severity="error">
                Network error .. Unable to load the page .. Please refresh 
             </Alert>
             </Collapse>
            }
        }
        getuser();
    },[ref])

    const updateyes=async (id,per)=>{
        setref(!ref)
        const userdoc=doc(collectionref,id);
        const change={per_class:true,
      denialreason:"sent to HOD",
        
        };
        updateDoc(userdoc,change);
       setalert1(true);
    }
    const updateno=(id,per)=>{
        if(denialreason==""){
            setalert2(true)
        }else{
            setref(!ref)
            const userdoc=doc(collectionref,id);
            const change={
            per_class:false,
            
            denialreason:"Permission denied by Classauthority : "+denialreason,
            };
            updateDoc(userdoc,change);
            setalert(true);
        }
       
    }
   
    const [year,setyear]=useState("");
    
    
return (
    
    <>
  
<Heading title="Class Authority Dashboard"></Heading>
<div style={{position:"absolute" ,top:"4.5rem",right:".5rem"}}>
       <Logout></Logout>
       </div>
    <BasicSelect title="Select Year" val1="FE" val2="SE" val3="TE" val4="BE" fun={setyear} />
    <BasicSelect title="Department" val1="CompA" val2="CompB" val3="IT" val4="EntcA" val5="EntcB" val6="Mech" fun={setdepartment} />
    <Collapse in={alert2}>
                <Alert severity="error">
                    You have not specified the denial reason  
                </Alert>
                {setTimeout( () => setalert2(false) , 2500)}
            </Collapse>
  <Collapse in={alert}>
  <Alert severity="info">You have rejected the leave application . </Alert>
{setTimeout( () => setalert(false) , 2500)}
  </Collapse>

  <Collapse in={alert1}>
  <Alert severity="info">You have passed the leave application . </Alert>
{setTimeout( () => setalert1(false) ,2500)}
  </Collapse>

   
    <div className="block">{users.map((users)=>{
        if((users.year==year && users.branch==department) && users.denialreason==""){
            {cnt++}
            return(
            
                

    <BigCard name={users.name} reason={users.reason}  regno={users.regno} year={users.year} key={users.id} startDate={users.startDate} endDate={users.enddate} yes={<Button variant="contained"  sx={{width:"100px" , height:"40px"}} onClick={()=>{updateyes(users.id,users.per_class)}}>Yes <CheckCircleIcon sx={{color:"white"}}></CheckCircleIcon></Button>} no={<Button variant="contained" color="error" sx={{width:"100px" ,height:"40px"}} onClick={()=>{updateno(users.id,users.per_class)}}>NO <CancelIcon sx={{color:"white"}}></CancelIcon></Button>} denialreason={<TextField title="denial reason" fun={setdenialreason} />}/>
   
              
                
            );
        }
        
    })}</div>
    {(cnt)?<div></div>:<div><Alert severity="info">No Applications Pending </Alert></div>}
    </>
);
}
export default ClassAuth;
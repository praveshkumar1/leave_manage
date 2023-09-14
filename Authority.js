import React from "react";
import { useEffect,useState } from "react";
import {db} from './firebase-config';
import {getDocs,collection,doc,addDoc,updateDoc} from 'firebase/firestore';
import Heading from "./components/Heading";
import RowAndColumnSpacing from "./components/Grid";
import { Button,Collapse } from "@mui/material";
import Alert from '@mui/material/Alert';
import TextField from './components/TextField';
import BigCard from "./components/BigCard";
import Logout from './components/Logout';
import './css/Gridcss.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
const Authority=()=>{
    const collectionref=collection(db,"user");
      const [denialreason,setdenialreason]=useState("");
       const [req,setreq]=useState([]);
       const[ref,setref]=useState(false);
       const[alert,setalert]=useState(false);
       const[alert1,setalert1]=useState(false);
       const[alert2,setalert2]=useState(false);
     var cnt=0;
       const updateyes=async(id,per)=>{
        setref(!ref)
        const userdoc=doc(db,"user",id);
        const changed={per_jd:true,
         denialreason:"granted permission",
            final_per:true
        }
        updateDoc(userdoc,changed)
            console.log("called update");
       }
       const updateno=async(id,per)=>{

        if(denialreason==""){
          setalert2(true);
       }
       else{
        setref(!ref)
        const userdoc=doc(db,"user",id);
        const changed={per_jd:false,
            
               denialreason:"Permission denied by JD : reason ->"+denialreason
        }
        updateDoc(userdoc,changed);
       }
       
       }
      const updatereason=async(id,reason)=>{
        const user=doc(db,"user",id);
        const changed={denialreason:denialreason
      
        };
        updateDoc(user,changed);
      }

    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= await getDocs(collectionref);
         setreq(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
     
          }
          catch(err){
             console.log(err);
             console.log("eror");
          }
       }
    
    getUser();
    }, [ref])
return(
    <>
    
  <Heading title="Authority Dashboard"></Heading>
    <div style={{position:'absolute' , right:'1rem ' ,top:'4.5rem'}}>
       <Logout></Logout>
       </div>
   
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
      You have not specified the denialreason. Please specify that first 
      {setTimeout( () => setalert2(false) , 3000)}
    </Alert>
  </Collapse>
<div className="block">{
req.map((req)=>{
    if(req.per_hod==true && req.denialreason=="Sent to JD"){
        {cnt++}     
    return(
      
        <div className="block_a" key={req.id}>
            {/* <div>{req.name}</div>
            <div>{req.reason}</div>
            <div>{req.email}</div>
            <div>{req.startDate}</div>
            <div>{req.enddate}</div>    
            {!req.per_class ? <div className="circle_red"></div> : <div className="circle_green"></div> }
            {!req.per_hod ? <div className="circle_red"></div> : <div className="circle_green"></div> }
            <button onClick={()=>{updatedecyes(req.id,req.per_jd)}}>Do Yes</button>
            <button onClick={()=>{updatedecno(req.id,req.per_jd)}}>Do No</button>
            <input type="text" placeholder="reason of denial" onChange={(e)=>{setdenialreason(e.target.value)}}/>
            <button onClick={()=>{updatereason(req.id,req.denialreason)}}>ok</button> */}
             {/* <RowAndColumnSpacing name={req.name} reason={req.reason} startDate={req.startDate} endDate={req.enddate} yes={<Button variant="contained" onClick={()=>{updateyes(req.id,req.per_class)}}>Yes</Button>} no={<Button variant="contained" onClick={()=>{updateno(req.id,req.per_class)}}>No</Button>} denialreason={<TextField title="denial reason" fun={setdenialreason}/>}/> */}

       <BigCard name={req.name} reason={req.reason} regno={req.regno} year={req.year} startDate={req.startDate} endDate={req.enddate} yes={<Button variant="contained" sx={{width:"100px" ,height:"40px"}} onClick={()=>{updateyes(req.id,req.per_class)}}>Yes <CheckCircleIcon sx={{color:"white"}}></CheckCircleIcon></Button>} no={<Button variant="contained" color="error" sx={{width:"100px" ,height:"40px"}} onClick={()=>{updateno(req.id,req.per_class)}}>No <CancelIcon sx={{color:"white"}}></CancelIcon></Button>} denialreason={<TextField title="denial reason" fun={setdenialreason}  />}></BigCard>
        </div>
        
    );
  
    }
})}</div>
{(cnt)?<div></div>:<div><Alert severity="info"> NO Applications to be processed </Alert></div>}
    </>

);
}
export default Authority;
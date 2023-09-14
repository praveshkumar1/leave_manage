import React from "react";
import './student.css';
 import './Homepage.css';
import { useEffect,useState } from "react";
import {getDocs,collection,doc,addDoc,setDoc,getDoc, updateDoc} from 'firebase/firestore';
import {db,auth,storage} from './firebase-config';
import {ref, uploadBytes} from 'firebase/storage';
import BasicSelect from './components/Select';
import BasicTextFields from './components/TextField';
import Button from '@mui/material/Button';
import { Box, minWidth } from "@mui/system";
import { Collapse, Grid ,Stack, Typography} from "@mui/material";
import Orders from './components/Table';
import Alert from '@mui/material/Alert';
import Logout from "./components/Logout";
import Heading from "./components/Heading";
import { Center } from "@chakra-ui/react";
const datecheck=(s1,s2)=>{
   const arr1=s1.split("-");
   const arr2=s2.split("-")
   for (let i = 0; i < arr1.length; i++) {
     if(arr1[i]>arr2[i]){
       return false;
     }
   }
   return true;
 }


    const Stu=(props)=>{



      const [req,setreq]=useState({name:"",
      reason:"",
      per_jd:false,
      per_class:false,
      per_hod:false, 
   });
      const [name,setname]=useState("");
       const [reason,setreason]=useState("");
       const [year,setyear]=useState("");
       const [branch,setbranch]=useState("");
       const per=false;
       const [enddate,setenddate]=useState("");
       const [startDate,setstartDate]=useState("");
       const collectionref=collection(db,"user");
       const [alert,setalert] =useState(false);
      const [alert1,setalert1]=useState(false);
      const [alert2,setalert2]=useState(false);
      const [push_data,setpush_data]=useState(false);
    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= await getDoc(doc(collectionref,auth.currentUser.uid));
         //setreq(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
         const res=data.data();
         setreq({...data.data()});
        // setreq({name:res.name,reason:res.reason,per:res.per})
         
         console.log("done");
         console.log(data.data());
          }
          catch(err){
             console.log(err);
            
          }
       }
    
    getUser();
    }, [push_data])
  
    
       
   
    
       const pushdata=async ()=>{
        
         if((reason == "" && startDate=="")&&enddate==""){
               setalert1(true);
               return ;
         }else{
            setalert1(false);
         }
         if(datecheck(enddate,startDate)){
            setalert2(true);
            return ;
         }else{
            setalert2(false);
         }
          try{
            setpush_data(!push_data);
            console.log(push_data);
            const user=doc(collectionref,auth.currentUser.uid);
            
           const change= {
               reason:reason,
               per_hod:per,
               per_class:per,
               per_jd:per,
               final_per:per,
               email:auth.currentUser.email,
               // branch:branch,
               // year:year,
               startDate:startDate,
               denialreason:"",
               enddate:enddate,
            }
            updateDoc(user,change);
         setalert(true);
         
     }catch(err){
    console.log(err);
      }
        
       }


       return(
       <>
    
      <Heading title="Student Dashboard"></Heading>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
     <h2  style={{marginBottom:"1rem"}} >Welcome <span style={{textTransform:"uppercase"}}>{req.name}</span></h2>
       <div style={{  marginBottom:"1rem",marginRight:"15px" }}>
       <Logout></Logout>
       </div>
     </div>
       

       <Collapse in={alert}>
       <Alert severity="success" >You have succesully created the request .Wait for teacher to respond </Alert>
       
       </Collapse>
       <Collapse in={alert1}>
       <Alert severity="error">Fill the complete details</Alert>
       </Collapse>
       <Collapse in={alert2}>
       <Alert severity="error">Start Date is more than end date or dates are inappropriate</Alert>
       </Collapse>
      <br />
     
        {/* <BasicTextFields title="Name" fun={setname}/> */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
         <div style={{minWidth:"50px",width:"400px"}}>
         <BasicTextFields title="Reason of Leave" fun={setreason}/>
         </div>
       
        </div>
              
        
         {/* <div style={{display:"flex" ,flexDirection:"row",gap:"2rem" ,justifyContent:"center"}}>
       <BasicSelect title="Select Year" val1="FE" val2="SE" val3="TE" val4="BE" fun={setyear} autoWidth="true" />
       <BasicSelect title="Select Branch" val1="CompA" val2="CompB" val3="IT" val4="EntcA" val5="EntcB" val6="Mech" fun={setbranch} />
       </div> */}
       {console.log(year)}
      
      
        <div style={{display:"flex" ,flexDirection:"row",gap:"5rem",justifyContent:"center"}}>
        <h4  style={{marginBottom:"1rem",marginTop:"2rem"}}>Start Date</h4>
        <h4 style={{marginBottom:"1rem",marginTop:"2rem"}}>End Date</h4>
        </div>
        <div style={{display:"flex" ,flexDirection:"row",gap:"2rem",justifyContent:"center"}}>
       
        <input style={{padding: "16px 16px",
  border: "1px solid #DDDDDD",
  borderRadius: "3px",
  color: "#212529",
  fontSize: "14px",
  fontWeight: "500"}} type="date" onChange={(e)=>{setstartDate(e.target.value)}}/>
   
       <input style={{padding: "16px 16px",
  border: "1px solid #DDDDDD",
  borderRadius: "3px",
  color: "#212529",
  fontSize: "14px",
  fontWeight: "500"}} type="date" onChange={(e)=>{setenddate(e.target.value)}}/>
   </div>
       
        <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              marginBottom="50px"
            >
            <Button onClick={pushdata} variant="contained"> Create Request </Button>
            </Stack>
        <br />
        <hr />
    <Orders  reason={req.reason} startDate={req.startDate} enddate={req.enddate} classper={req.per_class} hodper={req.hod_per} denail={req.denialreason} classper_once={req.per_once_class}/>
 
      </>);
    }
    

export default Stu;
import React from "react";
import './css/ye.css';
import Card from './components/Card';
import pic from './assets/backg1.jpg' 
const Homepage=()=>{
   return (
      <>
      <div style={{background:"#FF5F6D", /* fallback for old browsers */
background: "-webkit-linear-gradient(to right, #FFC371, #FF5F6D)",  /* Chrome 10-25, Safari 5.1-6 */
background: "linear-gradient(to right, #FFC371, #FF5F6D)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
height:"100vh"}}>
      <h2 style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"1.5rem ",color:"white"}}>ARMY INSTITUTE OF TECHNOLOGY </h2>
      <h3 style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"0.5rem ",color:"white"}}>LEAVE MANAGEMENT SYSTEM </h3>
     
<div className="div_main_home">

   <Card linkname="Login" heading="Login & Registeration " link="login" className="card_main"></Card>

   </div>
   </div>
      </>
      
      
   );
}
export default Homepage;
import * as React from 'react';
import {auth} from './firebase-config';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 import { Alert,Collapse } from '@mui/material';
import { useState } from 'react';
import pic from './assets/photo_login.avif';
 import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide({setIsAuth}) {
      const navigate=useNavigate();
    const [alert,setalert]=useState(false);
    const [alert2,setalert2]=useState(false);
    const [alert3,setalert3]=useState(false);
    var details={};
    var errmess=" ";

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    details={
      email: data.get('email'),
      password: data.get('password'),
    }
        if(details.email=="" && details.password==""){
setalert(true);
    }else{
        setalert(false);
        setalert2(true);
        setalert3(false);
    }
    try{
    const user = await signInWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      setIsAuth(true);
      // console.log("iske baad ye")
      if(details.email=="auth@auth.com"){
        navigate('/auth');
    }
    if(details.email=="comphod@gmail.com"){
        navigate('/hod');
    }
    else if(details.email=="classauth@gmail.com"){
      navigate('/classauth');
    }
    else if(details.email != (("classauth@gmail.com" && "comphod@gmail.com")&& "auth@auth.com" )){
      console.log("yahan pahuncha ");
     navigate('/stu')
    }
console.log("ok");
    }catch(err){
        setalert2(false);
        setalert3(true);
        errmess=err.message;
        console.log(err.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(data:image/jpeg;base64,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)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
          {/* <img src={pic} alt="" style={{
            backgroundRepeat: 'no-repeat',
            width:'100%',
           // maxWidth:"600px",
 height:'auto',
            width:'500px',
            backgroundSize: 'cover',
           backgroundPosition: 'center',}}/>
          </Grid> */}
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Collapse in={alert}>
    <Alert severity="error">Fill the complete details</Alert>
        </Collapse>
       <Collapse in={alert2}>
        <Alert severity="success" >Authenticating .Please Wait</Alert>
        </Collapse>
        <Collapse in={alert3}>
        <Alert severity="error" >There was an error logging you in .Check your credentials</Alert>
        </Collapse> 
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
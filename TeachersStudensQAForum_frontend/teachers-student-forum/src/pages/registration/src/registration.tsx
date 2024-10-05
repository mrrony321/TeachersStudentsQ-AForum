import React, { useState } from "react";
import { Typography, Grid, Button, Container, InputAdornment, IconButton, Backdrop, CircularProgress } from "@mui/material";
import './registration.css';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PlaceIcon from '@mui/icons-material/Place';
import { Navbar } from "src/component/navbar/src/navbar";
import { useNavigate } from "react-router-dom";
import { RegistrationService } from "src/services/src/registrationService";
import { SessionTag } from "src/services/src/Enums";
import { localSet } from "src/services/src/commonService";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Textfield from "src/component/form/textfield/src/textField";

const INTIAL_FORM_STATE = {
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
};

const FORM_VALIDATION = Yup.object().shape({
name: Yup.string()
    .required(),
email: Yup.string()
    .matches(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,"Please enter valid email")
    .required(),
password: Yup.string()
    .min(8, 'Password is too short - should be 8 characters minimum.')
    .matches(/[a-z]/, 'Password should contain atleast one lowercase letter.')
    .matches(/[A-Z]/, 'Password should contain atleast one uppercase letter.')
    .matches(/[0-9]/, 'Password should contain atleast one number(0~9).')
    .matches(/[!@#$%^&*()_+\-=\]{};':"\\|,.?]+/,'Password should contain atleast one special character')
    .required() ,
phone: Yup.string()
    .matches(/^(\+88-|\+88|0)?\d{11}$/,"Please use a valid phone number")
    .required(),
city: Yup.string()
    .required()
});


export function Registration() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [backdropOpen, setBackdropOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    function redirectSignIn() {
        navigate("/login")
    }
    async function registerDR(value: any) {
            setBackdropOpen(true)
            await RegistrationService(value?.name, value?.email, value?.password, value?.phone, value?.city).then((response: any) => {
                setBackdropOpen(false)

                if (response?.code === 6001) {
                    localSet(SessionTag.OtpToken, SessionTag.OtpToken, response?.data?.token)
                    navigate("/otp")
                }
            })
        
    }
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                style={{ backgroundColor: "#EAECE7", minHeight: "100vh" }}
            >
                <Grid item style={{backgroundColor: "#1a2d40", color:"white"}}>
                    <Navbar />
                </Grid>
                <Grid item >
                    <Container className="registrationBox">
                        <Backdrop
                            open={backdropOpen}
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        >
                            <CircularProgress color="primary" />
                        </Backdrop>
                        <Grid container direction={"column"} justifyContent="space-between" alignItems="strech" className="registerArea">
                            <Grid item>
                                <Typography style={{ textAlign: "center", fontSize: "24px", fontWeight: 500, marginBottom: "30px" }}>Sign Up</Typography>
                            </Grid>
                            <Formik
                                initialValues={{
                                    ...INTIAL_FORM_STATE
                                }}
                                validationSchema={FORM_VALIDATION}
                                onSubmit={values => {
                                    registerDR(values)
                                }}
                                
                                >
                                    <Form>
                                    <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12} style={{width: "100%"}}>
                                <Textfield name='name' Placeholder="Name" type="text"
                                            inputprop={{
                                                    startAdornment: (<InputAdornment position="start">
                                                        <AccountBoxIcon />
                                                    </InputAdornment>
                                                    )
                                            }}
                                            />
                            </Grid>
                            <Grid item xs={12} style={{width: "100%"}}>
                            <Textfield name='email' Placeholder="Email Address" type="text"
                                            inputprop={{
                                                startAdornment: (<InputAdornment position="start">
                                                <EmailIcon/>
                                            </InputAdornment>
                                            )
                                            }}
                                             />
                            </Grid>
                            <Grid item xs={12} style={{width: "100%"}}>
                            <Textfield name='password' Placeholder="Password" type={showPassword ? "text" : "password"}
                                            inputprop={{
                                                endAdornment: (<InputAdornment position="end">
                                                        <IconButton onClick={() => { setShowPassword(!showPassword) }}>
                                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
            
            
                                                    </InputAdornment>
                                                    ),
                                                    startAdornment: (<InputAdornment position="start">
                                                        <PasswordIcon />
                                                    </InputAdornment>
                                                    )
                                            }}
                                            />
                            </Grid>

                            <Grid item xs={12} style={{width: "100%"}}>
                            <Textfield name='phone' Placeholder="Phone" type="text"
                                            inputprop={{
                                                startAdornment: (<InputAdornment position="start">
                                                <PhoneIcon/>
                                            </InputAdornment>
                                            )
                                            }}
                                             />
                            </Grid>
                            <Grid item xs={12} style={{width: "100%"}}>
                            <Textfield name='city' Placeholder="City" type="text"
                                            inputprop={{
                                                startAdornment: (<InputAdornment position="start">
                                                <PlaceIcon/>
                                            </InputAdornment>
                                            )
                                            }}
                                             />
                            </Grid>
                            <Grid item ><Button className="signupButton" type="submit">Sign up</Button></Grid>
                            </Grid>
                                    </Form>
                                    </Formik>
                            
                            <Grid item><Typography style={{ paddingTop: "30px" }}>Already signed up? Please <span style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                                redirectSignIn()
                            }}>login</span></Typography></Grid>
                        </Grid>
                    </Container>
                </Grid>

            </Grid>


        </>
    )
}
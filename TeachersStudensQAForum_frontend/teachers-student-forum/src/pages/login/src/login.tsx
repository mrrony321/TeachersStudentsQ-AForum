
import React, { useState } from "react";
//Customizable Area Start
import { InputAdornment, IconButton, Grid, Button, Typography, Container, Backdrop, CircularProgress, TextField } from "@mui/material";
import './login.css';
import { Navbar } from "../../../component/navbar/src/navbar.tsx";
import { json, useNavigate } from "react-router-dom";
// import { LoginService, SocialLogin } from "../../../services/src/loginService.tsx";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import { SessionTag } from "../../../services/src/Enums.ts";
import { localSet } from "../../../services/src/commonService";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
//Customizable Area End


const INTIAL_FORM_STATE = {
    emailPhone: '',
    password: '',
};

const FORM_VALIDATION = Yup.object().shape({
    emailPhone: Yup.string()
        .required("Email/Phone Number is required")
        .test('test-name', 'Enter Valid Phone/Email',
            function (value) {
                const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                const phoneRegex = /^(\+88-|\+88|0)?\d{11}$/;
                let isValidEmail = emailRegex.test(value);
                let isValidPhone = phoneRegex.test(value);
                if (!isValidEmail && !isValidPhone) {
                    return false;
                }
                return true;
            }),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 characters minimum.')
        .matches(/[a-z]/, 'Password should contain atleast one lowercase letter.')
        .matches(/[A-Z]/, 'Password should contain atleast one uppercase letter.')
        .matches(/[0-9]/, 'Password should contain atleast one number(0~9).')
        .matches(/[!@#$%^&*()_+\-=\]{};':"\\|,.?]+/, 'Password should contain atleast one special character')
        .required(),

});

export function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [backdropOpen, setBackdropOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    function redirectSignUp() {
        navigate("/signup")
    }

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRadioSelection(event.target.value);
    // };


    async function loginDR(value: any) {
        setBackdropOpen(true)
        let email_phone = value?.emailPhone
        // await LoginService(email_phone, value?.password).then((response: any) => {
        //     setBackdropOpen(false)
        //     localSet(SessionTag.JwtToken, SessionTag.JwtToken, response?.data?.Authorization)
        //     if (response?.code === 6001) {
        //         localSet(SessionTag.OtpToken, SessionTag.OtpToken, response?.data?.token)
        //         navigate("/otp")
        //     } else if (response?.code === 0) {
        //         navigate("/")
        //     }
        // })

    }

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                style={{ backgroundColor: "#EAECE7" }}
            >
                <Backdrop
                    open={backdropOpen}
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <CircularProgress color="primary" />
                </Backdrop>
                <Grid item style={{ backgroundColor: "#1a2d40", color: "white" }}>
                    <Navbar />
                </Grid>
                <Grid item >
                    <Container className="loginBox">
                        <Grid container direction="column" justifyContent="space-between" alignItems="strech" className="loginArea">
                            <Grid item>
                                <Typography className="titleLogin">Login</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Formik
                                    initialValues={{
                                        ...INTIAL_FORM_STATE
                                    }}
                                    validationSchema={FORM_VALIDATION}
                                    onSubmit={values => {
                                        loginDR(values)
                                    }}
                                >
                                    <Form>
                                        <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={3}>
                                            <Grid item xs={12} style={{ width: "100%" }}>
                                                <TextField name='emailPhone' placeholder="Email/Phone" type="text" fullWidth
                                                    inputProps={{
                                                        startAdornment: (<InputAdornment position="start">
                                                            <LoginIcon />
                                                        </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} style={{ width: "100%" }}>
                                                <TextField name='password' placeholder="Password" type={showPassword ? "text" : "password"} fullWidth
                                                    inputProps={{
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction="row" justifyContent="space-between">
                                                <Grid item><Button type="submit" className="loginButton" >Log in</Button>
                                                </Grid>
                                                <Grid item><Typography style={{ textAlign: "end", padding: "12px 0px" }} onClick={() => { }}>Forget Password ?</Typography></Grid>
                                            </Grid>


                                        </Grid>
                                    </Form>
                                </Formik>
                            </Grid>

                            <Grid item>
                                <Typography style={{ paddingTop: "40px" }}>Don't have any account? Please <span style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                                    redirectSignUp()
                                }}>sign up</span></Typography></Grid>
                        </Grid>
                    </Container>
                </Grid>

            </Grid>

        </>
    )
}
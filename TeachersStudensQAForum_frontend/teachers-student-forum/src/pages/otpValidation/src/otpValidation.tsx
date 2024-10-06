import React, { useState } from "react";
import { InputAdornment, Grid,  Button, IconButton, Typography, Container, Backdrop, CircularProgress, TextField } from "@mui/material";
import './otpValidation.css';
import { Navbar } from "../../../component/navbar/src/navbar.tsx";
import { useNavigate } from "react-router-dom";
import SmartScreenIcon from '@mui/icons-material/SmartScreen';
import CachedIcon from '@mui/icons-material/Cached';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SessionTag } from "../../../services/src/Enums.ts";
import { localSet, localGet, localRemove } from "../../../services/src/commonService.ts";
import { Formik, Form } from "formik";
import * as Yup from 'yup';


const INTIAL_FORM_STATE = {
    otp: ''
};

const FORM_VALIDATION = Yup.object().shape({
otp: Yup.string()
    .matches(/^\d{6}$/,"Please use a valid otp number")
    .required(),
});

export function OtpValidation() {
    const [token, setToken] = useState<string>(localGet(SessionTag.OtpToken, SessionTag.OtpToken))
    const [showOtp, setShowOtp] = useState<boolean>(false)
    const [backdropOpen, setBackdropOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    
    // async function resendOtpWeb() {
    //     setBackdropOpen(true)
    //     await ResendOtp(token).then((data: any) => {
    //         localSet(SessionTag.OtpToken, SessionTag.OtpToken, data?.data?.token)
    //         setToken(data?.data?.token)
    //         setBackdropOpen(false)
    //     })
    // }
    // async function sendOtp(values: any) {
    //     setBackdropOpen(true)
    //     await ValidateOtp(token, values?.otp).then((data: any) => {
    //         setBackdropOpen(false)
    //         if (data) {
    //             localRemove(SessionTag.OtpToken, SessionTag.OtpToken)
    //             navigate("/login")
    //         }
    //     })
    // }

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                style={{ backgroundColor: "#EAECE7"}}
            >
                <Grid item style={{backgroundColor: "#1a2d40", color:"white"}}>
                    <Navbar />
                </Grid>
                <Grid item xs={10}>
                    <Container className="otpBox">
                        <Backdrop
                            open={backdropOpen}
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        >
                            <CircularProgress color="primary" />
                        </Backdrop>
                        <Grid container direction={"column"} justifyContent="space-between" alignItems="strech" className="loginArea">
                            <Grid item>
                                <Typography style={{ textAlign: "center", fontSize: "24px", fontWeight: 500, marginBottom: "10px" }}>OTP Varification</Typography>

                                <Typography style={{ textAlign: "center", fontSize: "14px", fontWeight: 400, marginBottom: "70px" }}>You will get an OTP via SMS</Typography>


                            </Grid>

                            <Formik
                            initialValues={{
                                ...INTIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={values => {
                                // sendOtp(values)
                            }}
                            >
                                <Form>
                                <Grid item style={{ marginBottom: "15px" }}>

                            <TextField name='otp' placeholder="Please enter the OTP" type={showOtp ? "text" : "password"}
                                            inputProps={{
                                                endAdornment: (<InputAdornment position="end">
                                                        <IconButton onClick={() => { setShowOtp(!showOtp) }}>
                                                            {showOtp ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
            
            
                                                    </InputAdornment>
                                                    ),
                                                    startAdornment: (<InputAdornment position="start">
                                                        <SmartScreenIcon />
                                                    </InputAdornment>
                                                    )
                                            }}
                                            />

                                        </Grid>
                                        <Grid item xs={12}>
                                        <Grid container direction="row" justifyContent="space-between">
                                            <Grid item>
                                                <Button className="otpButton1" style={{ paddingRight: "10px" }} type="submit">Validate</Button>
                                                <Button className="otpButton" onClick={() => {
                                                    // resendOtpWeb()
                                                }}>Resend  <CachedIcon /></Button>
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                </Form>
                            </Formik>
                        </Grid>
                    </Container>
                </Grid>

            </Grid>


        </>
    )
}
import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import './footer.css';
export function Footer(){
    return (
        <Box className="backGround">
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} md={2}>
                    <Typography>Menu</Typography>
                    <Typography>Home</Typography>
                    <Typography>About Us</Typography>
                    <Typography>Terms and Conditions</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography>Help</Typography>
                    <Typography>FAQ</Typography>
                    <Typography>Consumer Area</Typography>
                    <Typography>Customer Care</Typography>
                    <Typography>Payment and Scheduals</Typography>
                </Grid>
                <Grid item md={2} xs={12}>
                    <Typography>Payment Methods</Typography>
                    <Grid container direction="row">
                    </Grid>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography>Contact Us</Typography>
                </Grid>
            </Grid>
        <Box className="divider"></Box>
        <Typography className="footerContent">&copy; 2023-2024 TurfManagementBangladesh</Typography>
        </Box>
    )
}
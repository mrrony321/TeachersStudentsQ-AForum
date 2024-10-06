import React from "react";
import { Typography, Box } from "@mui/material";
import './footer.css';
export function Footer(){
    return (
        <Box className="backGround">
        <Box className="divider"></Box>
        <Typography className="footerContent">&copy; 2023-2024 Teachers Students QA Forum</Typography>
        </Box>
    )
}
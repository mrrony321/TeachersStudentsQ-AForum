import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
export function Navbar() {
  const navigate = useNavigate();
  function redirectHome() {
    navigate("/");
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: "10px" }}
      >
        <Grid item xs={1}>
          <Box>
            <Typography style={{ textAlign: "center" }}>Logo</Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" spacing="4" alignItems="center">
            <Grid item xs={2}>
              <Typography
                onClick={() => {
                  redirectHome();
                }}
              >
                Home
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>About</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Turf List</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Payments</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{ textAlign: "center" }}
            onClick={() => {
              navigate("/onboard");
            }}
          >
            Company Registration
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            style={{ textAlign: "center" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

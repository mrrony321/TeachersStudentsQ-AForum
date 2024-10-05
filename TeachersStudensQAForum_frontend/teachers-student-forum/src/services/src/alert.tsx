import React, { useState } from "react";
import {  Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
export const configJSON = require("./config");
export function AlertModule(trigger: boolean, msg: string, type: any){
  //const [test, setTest] = useState(true)
  let test: boolean = trigger
    return(
        <>
      <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={test}
                        onClose={() => {
                            test = false
                        }}
                        autoHideDuration={3000}
                    >
                        <Alert severity={type}
                            elevation={6} variant="filled"
                        >{msg}</Alert>
                    </Snackbar>
                    
                </>
    )
  }
    



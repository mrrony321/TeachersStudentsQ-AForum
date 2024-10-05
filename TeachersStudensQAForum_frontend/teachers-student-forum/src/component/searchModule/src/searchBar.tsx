import { Autocomplete,TextField, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { parse, parseISO } from "date-fns";
import { localGet } from "src/services/src/commonService";
import moment from "moment";


const districtData = require('src/data/src/bd-districts.json')
const typeData = require('src/data/src/types.json')
const timeData = require('src/data/src/times.json')
const typeNew = localGet("search","type")
const durationNew = localGet("search","duration")
const dateNew = localGet("search","date")
const startTimeN = localGet("search","startTime")
const endTimeN = localGet("search","endTime")
const districtN = localGet("search","district")
const duration = ["60","90"]

const INTIAL_FORM_STATE = {
  district: `${districtN}`,
  type: `${typeNew}`,
  duration: `${durationNew}`,
  searchDate: dateNew,
  startTime: `${startTimeN}` ,
  endTime: `${endTimeN}` 
};


const FORM_VALIDATION = Yup.object().shape({
district: Yup.string()
  .required(),
type: Yup.string()
  .required(),
duration: Yup.string()
  .required(),
searchDate: Yup.string()
  .required("date is a required field"),
startTime: Yup.string()
  .required("start time is a required field"),
endTime: Yup.string()
  .required("end time is a required field"),
});



export function SearchBar(props: any) {
  const navigate = useNavigate();
  function redirectHome() {
    navigate("/");
  }
  const name = props.name

  const districts : any[] = []
  districtData.districts.map((item: any)=>{
      districts.push(item?.name)
      return true
  })

  const types: any = [];
  typeData.types.map((item: any)=>{
      types.push(item?.name)
      return true
  })

  const slots: any = [];
  let endSlots: any = [];
  timeData.ampm.map((item : any)=>{
    slots.push(item?.time)
    endSlots.push(item?.time)
    return true
  })

  
  function splitLogic(value: any){

    timeData.ampm.map((item : any)=>{
      if(item.id>value){
        endSlots.push(item?.time)
      }    
      return true
    })
    timeData.ampm.map((item : any)=>{
      let upper = 8-(23-parseInt(value))
      
      if(item.id<upper){
        endSlots.push(item?.time)
      }
      return true
    })
    
  }
  function nonSplitLogic(value: any){
    timeData.ampm.map((item : any)=>{
      if(item.id>value && item.id<(parseInt(value)+9)){
        endSlots.push(item?.time)
      }
      return true
    })
  }

  function nonLogicEndTime(){
    timeData.ampm.map((item : any)=>{
      endSlots.push(item?.time)
      return true
    })
  }
    const searchOp=(value: any)=>{
      console.log("values")
    }
    const endTimeConvert=(value: any)=>{
      if(value !== null){
        let x: any =[]
        endSlots = x
        x =value.split(":")
        x[0]>15 ? splitLogic(x[0]) : nonSplitLogic(x[0])
      }else{
        let x: any =[]
        endSlots = x
        nonLogicEndTime()
      }
             
    }

    const returnDuration=(value:any)=>{
      if(value !==''){
        return `${value} min`
      }else{
        return value
      }
    }
  return (
    <>
      
        <Formik 
                initialValues={{
                  ...INTIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                console.log("submit",values)
              }}
                >
      {({ errors, handleSubmit, touched, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        style={{ padding: "20px 10px", backgroundColor: "#ffffff" }}
      >
        
        <Grid item md={1.5} xs={6}>
        <Autocomplete
                    value={values?.district || null }
                    getOptionLabel={option => option}
                    onChange={(e,value) => setFieldValue("district", 
                    value !=='' ? value : values.district, 
                    true)}
                    disablePortal
                    id="district-select"
                    options={districts}
                    fullWidth
                    renderInput={(params) => <TextField 
                      {...params} 
                      label="Districts" 
                      error = {Boolean(touched.district && errors.district)}
                      helperText = {touched.district && errors.district}
                      />}
                    />
        </Grid>
        <Grid item md={1.5} xs={6}>
        <Autocomplete
                    value={values?.type || null }
                    getOptionLabel={option => option}
                    onChange={(e, value) => setFieldValue("type", 
                    value !=='' ? value : values.type,
                    true)}
                    disablePortal
                    id="types-select"
                    options={types}
                    fullWidth
                    renderInput={(params) => <TextField 
                      {...params} 
                      label="Types" 
                      error = {Boolean(touched.type && errors.type)}
                      helperText = {touched.type && errors.type}
                      />}
                    />
        </Grid>
        <Grid item md={1.5} xs={6}>
        <Autocomplete
                    value={values?.duration || null }
                    getOptionLabel={option => returnDuration(option)}
                    onChange={(event: any,value: string| null) => setFieldValue("duration", 
                    value !=='' ? value : values.duration,
                    true)}
                    disablePortal
                    id="duration-select"
                    options={duration}
                    fullWidth
                    renderInput={(params) => <TextField 
                      {...params} 
                      label="Duration" 
                      error = {Boolean(touched.duration && errors.duration)}
                      helperText = {touched.duration && errors.duration}
                      />}
                    />
        </Grid>
        <Grid item md={1.5} xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                            //defaultValue = {values?.searchDate}
                            value={moment(values?.searchDate)}
                              onChange={(value) => {
                                setFieldValue("searchDate", value, true)
                              }
                                }
                              // value={parseISO(values?.searchDate)||dateNew}
                              format="yyyy/MM/dd"
                              disablePast={true}
                              slotProps={{textField : 
                                {
                                    error:Boolean(touched.searchDate && errors.searchDate),
                                    helperText: (touched.searchDate && errors.searchDate) ? <>{errors.searchDate}</> : null,
                                    name: "searchDate",
                                    variant: "outlined",
                                    fullWidth: true
                                }
                            }}
                            />
                          </LocalizationProvider>
        </Grid>
        <Grid item md={1.5} xs={6}>
        <Autocomplete
                                    value={values?.startTime || null }
                                    getOptionLabel={option => option}
                                    onChange={(e,value) => {
                                      setFieldValue("startTime", value !=='' ? value : values.startTime, true)
                                      endTimeConvert(value)
                                      setFieldValue("endTime", '', true)
                                    }}
                                    disablePortal
                                    id="start-time-select"
                                    options={slots}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} 
                                    label="Start Time" 
                                    error = {Boolean(touched.startTime && errors.startTime)}
                                      helperText = {touched.startTime && errors.startTime}
                                    />}
                                    />
        </Grid>
        <Grid item md={1.5} xs={6}>
        <Autocomplete
                                    value={values?.endTime || null }
                                    getOptionLabel={option => option}
                                    onChange={(e,value) => setFieldValue("endTime", value !=='' ? value : values.endTime, true)}
                                    disablePortal
                                    id="end-time-select"
                                    options={endSlots}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="End time" 
                                    error = {Boolean(touched.endTime && errors.endTime)}
                                    helperText = {touched.endTime && errors.endTime}
                                    />}
                                    />
        </Grid>
        <Grid item>
          <Button className="searchButtonBar" type="submit"><Typography>Modify</Typography></Button>
        </Grid>
        </Grid>
        </Form>
        )}
        </Formik>
        
        
      
    </>
  );
}

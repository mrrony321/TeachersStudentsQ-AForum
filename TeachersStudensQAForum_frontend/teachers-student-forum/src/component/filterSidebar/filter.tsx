import React, {useState} from "react";
import { Typography, Grid, Slider, Checkbox, Divider } from "@mui/material";
import './filter.css';
import { number } from "yup";


export function Filter(){
    const [value, setValue] = React.useState<number[]>([1000, 4000]);
    const [check1,setCheck1] = useState<boolean>(false)
    const [check2,setCheck2] = useState<boolean>(false)
    const [check3,setCheck3] = useState<boolean>(false)
    const [check4,setCheck4] = useState<boolean>(false)


    const textMarks = [
        {
          value: 0,
          label: '',
        },
        {
          value: 10000,
          label: '',
        },
      ];
    
      const handleValue = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
    function sliderHelperText(value: number) {
        return `${value} BDT`;
      };
      const handleCheckBox=(id: number)=>{
        id === 1 && setCheck1(!check1)
        id === 2 && setCheck1(!check2)
        id === 3 && setCheck1(!check3)
        id === 4 && setCheck1(!check4)

      }
    return (
        <Grid container direction="column" className="filterContainer">
            <Grid item className="filterBoxes">
                <Typography>--- search result found</Typography>
                <Typography style={{padding: "5px 0"}}>Filter By</Typography>
            </Grid>
            <Divider />
            <Grid item className="filterBoxes">
                <Typography>Price Range</Typography>
                <Slider
                    valueLabelDisplay="auto"
                    getAriaValueText={sliderHelperText}
                    defaultValue={30}
                    marks={textMarks}
                    value={value}
                    onChange={handleValue}
                    max={10000}
                />
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Grid item><Typography className="rangeSelectorText">0.00 BDT</Typography></Grid>
                    <Grid item><Typography className="rangeSelectorText">10000.00 BDT</Typography></Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Grid item className="filterBoxes">
                <Typography>Tags</Typography>
                <Grid container direction="column">
                  <Grid item container direction='row'>
                  <Checkbox checked={check1} onChange={()=>{handleCheckBox(1)}}  />
                  <Typography>Tag 1</Typography>
                  </Grid>
                </Grid>
                <Checkbox checked={check2} onChange={()=>{handleCheckBox(2)}} />
                <Checkbox checked={check3} onChange={()=>{handleCheckBox(3)}} />
                <Checkbox checked={check4} onChange={()=>{handleCheckBox(4)}} />

            </Grid>

        </Grid>
    )
}
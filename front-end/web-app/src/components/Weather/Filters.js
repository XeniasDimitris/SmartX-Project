
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Title from '../Title';
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Typography } from '@material-ui/core';

export default function Filters(props) {
  //-------------------------------
  // All about checkboxes
  //-------------------------------
  const [disabled,setDisabled] = React.useState(true)
  const [checkboxState, setcheckboxState] = React.useState({
    temperature: false,
    dew: false,
    humidity: false,
    pressure: false,
    wind_direction: false,
    wind_speed: false,
  });

  const handleCheckboxChange = (event) => {
    setcheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });
 

  };
  React.useEffect(()=>{
    let disable = true
    for (let key in checkboxState) {
      if (checkboxState[key] === true){
          disable=false
      }
    }
    setDisabled(disable)
  },[checkboxState])

  const { temperature, dew, humidity, pressure, wind_direction, wind_speed } = checkboxState;

  //-------------------------------
  //All about dates selection
  //-------------------------------
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);



  const handleDateStartChange = (date) => {
    setSelectedStartDate(date);
  };  
  
  const handleDateEndChange = (date) => {
    setSelectedEndDate(date)
  };

  //-------------------------------
  //All about Button click
  //-------------------------------
  const handleClick = (e) =>{
    props.handleSetFilters({start:selectedStartDate, end:selectedEndDate, datasets: checkboxState})
  }

  return (
    <div>

    {/* ----------------------------------------- */}
    {/* Date Pickers */}
    {/* ----------------------------------------- */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Title >1) Select a Date Window </Title> 
        <KeyboardDatePicker
          clearable
          disableFuture
          placeholder="dd/MM/YYYY"
          format="dd/MM/yyyy"
          margin="normal"
          id="start-date-picker-dialog"
          label="Select Initial"
          value={selectedStartDate}
          onChange={handleDateStartChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{display:'flex'}}
        />
        <KeyboardDatePicker
          clearable
          disableFuture
          margin="normal"
          placeholder="dd/MM/YYYY"
          id="end-date-picker-dialog"
          label="Select Last"
          value={selectedEndDate}
          format="dd/MM/yyyy"
          onChange={handleDateEndChange}
          minDate = {selectedStartDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{display:'flex'}}
        />
    </MuiPickersUtilsProvider>
    <FormControl component="fieldset" style={{marginTop: 40, display:'flex'}}>
     <FormLabel required component="legend"  style={{color:'black'}} > <Title>2) Select Dataset</Title> 
                <Typography component='span'variant='body2' > (At least 1)</Typography> 
    </FormLabel>

    {/* ----------------------------------------- */}
    {/* Checkboxes */}
    {/* ----------------------------------------- */}
     <FormGroup style={{marginTop: 10}}>
        <FormControlLabel
         control={<Checkbox checked={temperature} onChange={handleCheckboxChange} name="temperature" />}
         label="Temperature"
        />
        <FormControlLabel
         control={<Checkbox checked={dew} onChange={handleCheckboxChange} name="dew" />}
         label="Dew Point"
        />
        <FormControlLabel
         control={<Checkbox checked={humidity} onChange={handleCheckboxChange} name="humidity" />}
         label="Humidity"
        />
        <FormControlLabel
         control={<Checkbox checked={pressure} onChange={handleCheckboxChange} name="pressure" />}
         label="Pressure"
        />
        <FormControlLabel
         control={<Checkbox checked={wind_direction} onChange={handleCheckboxChange} name="wind_direction" />}
         label="Wind Direction"
        />        
        <FormControlLabel
        control={<Checkbox checked={wind_speed}  onChange={handleCheckboxChange} name="wind_speed" />}
        label="Wind Speed"
       />
     </FormGroup>
   </FormControl>

  {/* ----------------------------------------- */}
  {/* Submission button */}
  {/* ----------------------------------------- */}
   <Button  style={{display:'flex',marginTop: 40}}
            color='secondary'
            variant='contained'
            disabled={disabled}
            onClick={handleClick}>
              <Typography>See Diagram</Typography>
   </Button>

  </div>
  );
}
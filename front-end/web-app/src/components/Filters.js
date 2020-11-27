
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Title from './Title';
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useTheme from '@material-ui/core/styles/useTheme'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function MaterialUIPickers(props) {
  const theme = useTheme()
  //-------------------------------
  // All about checkboxes
  //-------------------------------
  const [checkboxState, setcheckboxState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const handleCheckboxChange = (event) => {
    setcheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });
  };


  const { gilad, jason, antoine } = checkboxState;

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

  const [disabled,setDisabled] = React.useState(false)

  const handleClick = (e) =>{
    props.handleSetFilters({start:selectedStartDate, end:selectedEndDate})
  }

  return (
    <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Title >Pick a Date </Title>
        <KeyboardDatePicker
          clearable
          disableFuture
          placeholder="dd/MM/YYYY"
          format="dd/MM/yyyy"
          margin="normal"
          id="start-date-picker-dialog"
          label="Choose Start"
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
          label="Choose End"
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
    <FormControl component="fieldset" style={{marginTop: 30, display:'flex'}}>
     <FormLabel required component="legend" > <Title>Choose Data</Title></FormLabel>
     <FormGroup>
       <FormControlLabel
         control={<Checkbox checked={gilad} onChange={handleCheckboxChange} name="gilad" />}
         label="Gilad Gray"
       />
       <FormControlLabel
         control={<Checkbox checked={jason} onChange={handleCheckboxChange} name="jason" />}
         label="Jason Killian"
       />
       <FormControlLabel
         control={<Checkbox checked={antoine} onChange={handleCheckboxChange} name="antoine" />}
         label="Antoine Llorca"
       />
     </FormGroup>
   </FormControl>
   <Button  style={{display:'flex',marginTop: 20,color:theme.palette.secondary.main}}
            variant='outlined'
            disabled={disabled}
            onClick={handleClick}>
               See Diagram
   </Button>

  </div>
  );
}
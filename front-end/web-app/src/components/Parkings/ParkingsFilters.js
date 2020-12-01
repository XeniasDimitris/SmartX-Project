
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Title from '../Title';
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
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

function FormItem(props){
    let handleCheckboxChange = props.handleCheckboxChange
    let name = props.name
    let checked = props.checked
    return(
        <React.Fragment>
            <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckboxChange} name={name} />}
                    label={name} 
            />
            {name==='All' && 
                (<React.Fragment> 
                    <Divider style={{marginBottom: '20px'}}/>
                    <FormHelperText>or pick one or many local communites</FormHelperText>
                </React.Fragment>
                )
            }
        </React.Fragment>
    )
}


export default function Filters(props) {
  const theme = useTheme()
  //-------------------------------
  // All about checkboxes
  //-------------------------------

  const [disabled,setDisabled] = React.useState(true)
  const [checkboxState, setcheckboxState] = React.useState({
    All: false,
    NORREPORT: false,
    BUSGADEHUSET: false,
    BRUUNS: false,
    SKOLEBAKKEN: false,
    SALLING: false,
    MAGASIN: false,
    SCANDCENTER: false,
    KALKVAERKSVEJ: false,
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Title >Select a Date Window </Title>
        <KeyboardDatePicker
          clearable
          disableFuture
          placeholder="dd/MM/YYYY"
          format="dd/MM/yyyy"
          margin="normal"
          id="start-date-picker-dialog"
          label="Select Start"
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
          label="Select End"
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
     <FormLabel required component="legend"  style={{color:'black'}} > <Title>Select Dataset</Title> 
                <Typography component='span'variant='body1' style={{color:'black'}}> (At least 1)</Typography> 
    </FormLabel>
     <FormGroup style={{marginTop: 10}}>
     <FormHelperText>See cumulative results</FormHelperText>
        { Object.keys(checkboxState).map((key,index)=>{
            return <FormItem key={index} 
                            handleCheckboxChange={handleCheckboxChange} 
                            checked={checkboxState[key]} 
                            name={key}/>
        })}
     </FormGroup>
   </FormControl>
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
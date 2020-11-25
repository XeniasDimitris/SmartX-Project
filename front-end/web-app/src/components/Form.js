
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Title from './Title';
import Button from '@material-ui/core/Button'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(()=>({
    button:{
        marginTop:19
    }
}))

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const classes = useStyles()
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const handleDateStartChange = (date) => {
    setSelectedStartDate(date);
  };  
  
  const handleDateEndChange = (date) => {
    setSelectedEndDate(date);
  };

  return (
      
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Title >Pick a Date </Title>
        <KeyboardDatePicker
          clearable
          disableFuture
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-dialog"
          label="Choose Start"
          value={selectedStartDate}
          onChange={handleDateStartChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          clearable
          disableFuture
          margin="normal"
          id="date-picker-dialog"
          label="Choose End "
          format="MM/dd/yyyy"
          value={selectedEndDate}
          onChange={handleDateEndChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <Button  color="secondary" onClick={() => { alert('clicked')}} className={classes.button} >Apply</Button>
    </MuiPickersUtilsProvider>
  );
}
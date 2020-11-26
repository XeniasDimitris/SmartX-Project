
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Title from './Title';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export default function MaterialUIPickers(props) {
  // The first commit of Material-UI

  const handleDateStartChange = (date) => {
    date ? props.setSelectedStartDate(date.toJSON()) : props.setSelectedStartDate(date);
  };  
  
  const handleDateEndChange = (date) => {
    date ? props.setSelectedEndDate(date.toJSON()) : props.setSelectedEndDate(date)
  };

  return (
      
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Title >Pick a Date </Title>
        <KeyboardDatePicker
          clearable
          disableFuture
          format="MM/dd/yyyy"
          margin="normal"
          id="start-date-picker-dialog"
          label="Choose Start"
          value={props.selectedStartDate}
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
          id="end-date-picker-dialog"
          label="Choose End"
          value={props.selectedEndDate}
          format="MM/dd/yyyy"
          onChange={handleDateEndChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{display:'flex'}}
        />
    </MuiPickersUtilsProvider>
  );
}
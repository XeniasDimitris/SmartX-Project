import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Title from '../Title'
import { Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';



//-------------------------------
// Component for each Checkobox
//-------------------------------
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
var models = {
    'Simple Exponential Smoothing': false,
    'Multiple Linear Regression': false,
    'Prophet': false,
    'ARIMA': false,
    'Vector Auto Regression': false,
    'Random Forest': false,
    'SVR': false,
    'LSTM': false,
    'MLP': false,
}


export default function Filters(props) {
    //-------------------------------
    // All about checkboxes
    //-------------------------------
    const [disabled,setDisabled] = React.useState(true)
    const [checkboxState, setcheckboxState] = React.useState(models);
  
    const handleCheckboxChange = (event) => {
      setcheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });  
    };

    const handleClick = () =>{
        props.handleSetFilters(checkboxState)
    }

    React.useEffect(()=>{
      let disable = true
      for (let key in checkboxState) {
        if (checkboxState[key] === true){
            disable=false
        }
      }
      setDisabled(disable)
    },[checkboxState])

    return(
        <div > 
        
          {/* ----------------------------------- */}
          {/* Checkboxes Form */}
          {/* ----------------------------------- */}
          <FormControl component="fieldset" >
            <FormLabel required component="legend"  style={{color:'black'}} > <Title>Select Prediction Model</Title> 
                    <Typography component='span'variant='body1' style={{color:'black'}}> (At least 1)</Typography> 
            </FormLabel>
            <FormGroup style={{marginTop: 20,}}>
                { Object.keys(checkboxState).map((key,index)=>{
                    return <FormItem key={index} 
                                style={{marginTop:40}}
                                handleCheckboxChange={handleCheckboxChange} 
                                checked={checkboxState[key]} 
                                name={key}/>
                })}
            </FormGroup>
          </FormControl>
        
        {/* ----------------------------------- */}
        {/* Submit Button */}
        {/* ----------------------------------- */}
        <Button  style={{display:'flex',marginTop: 40}}
                color='secondary'
                variant='contained'
                disabled={disabled}
                onClick={handleClick}>
                    <Typography>Continue</Typography>
        </Button>
        </div>
    )
}
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
export default function PopupMsg(props){
    let popupSensor = props.popupSensor
    let handleClickButton = props.handleClickButton
    return (
        <React.Fragment>
            <Box m={1}>
            <Typography component='span'> 
            <Box mb={1} textAlign="center" fontSize="h6.fontSize" style={{textDecoration: 'underline'}}> Details  </Box>
            </Typography>
            <Typography component='span'  style={{display: 'flex'}}> 
            <Box mr={1}> Id:  </Box>
            <Box fontWeight='fontWeightBold'>{popupSensor.id}</Box>
            </Typography>
            <Typography component='span'  style={{display: 'flex'}}> 
            <Box mr={1}> Street:  </Box>
            <Box fontWeight='fontWeightBold'>{popupSensor.street}</Box>
            </Typography>
            <Typography component='span'  style={{display: 'flex'}}> 
            <Box mr={1}> Number:  </Box>
            <Box fontWeight='fontWeightBold'>{popupSensor.number}</Box>
            </Typography>
            <Typography component='span'  style={{display: 'flex'}}> 
            <Box mr={1}> City:  </Box>
            <Box fontWeight='fontWeightBold'>{popupSensor.city}</Box>
            </Typography>
            </Box>
            <Button color='secondary' disabled={props.disabledButton} onClick={handleClickButton(popupSensor)}> <Typography>Choose</Typography></Button>
        </React.Fragment>
    )
}
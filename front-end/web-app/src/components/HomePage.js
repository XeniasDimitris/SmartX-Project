import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import logo from "../Images/SmartX_City-Logo.png"

import { useStyles }  from '../css/DashboardCSS'

export default function HomePage(){
    const classes = useStyles()

    return(
        <Paper className={classes.paper}>
            <Typography variant='h4'align='center'>
            <img src={logo} alt = "Logo"  />
            </Typography>
            <Typography component="div">
            <Box fontSize='h4.fontSize' m={1} mt={2}>
                Welcome to SmartX-City Project
            </Box>
            <Box textAlign="justify" m={1} pt={2}>
                <p style={{textIndent: '40px'}}>
                SmartX-City Project aims to provide an Information System (IS) for Smart Cities as a central platform for data management and taking action plans.
                Within this project, our IS has been designed for Arhus City. Aarhus is the second-largest city in Denmark and seat of Aarhus municipality and it's located
                on the east coast of the Jutland peninsula, in the geographical centre of Denmark.</p>
                <p style={{textIndent: '40px'}}>
                The first step and the most important for our project is to obtain as many data as we can. For this reason we should increase the number of data sources across the town
                in a way that he have a great diversity between them. It's important because we need to know what exactly happens in our town in a valid-number way. 
                For this project we have used open data that Aarhus Municipality has provided in the official website, but we have to highlight that this project 
                is scalable and if we have more data sources, we can extend the features of our platform.</p>
                 <p style={{textIndent: '40px'}}>
                After taking our data, he have to prepare them for consuming. This step inlcudes managing missing values, 
                cleaning them and holding the information we need. Next, we have to proceed with our descriptive analytics via many visualizations.
                These can pie charts, bar charts, line charts, some maps when our data are related with sensors etc. To provide these analytics we use 
                our <b> Dashboard</b> section which you can find in the menu on your left. This section consists of 7 sub-sections for each different data source:
                </p>
                <ul>
                    <li>Weather</li>
                    <li>Demographics</li>
                    <li>Traffic</li>
                    <li>Pollution</li>
                    <li>Dokk1</li>
                    <li>Events</li>
                    <li>Parking</li>
                </ul>
                <p>
                With these visualizations and the ability to use filters and extract exactly the information we need, we are in a position that we can 
                know everything about our town with an easy-to-use and user friendly way. 
                </p>
            </Box>
            </Typography>
        </Paper>
    )
}
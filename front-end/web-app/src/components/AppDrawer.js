import React, { useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from './Menu.js';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles }  from '../css/DashboardCSS'

import logo from "../Images/SmartX_City-Logo.png"

export default function AppDrawer(props){
    const classes = useStyles();
    const [listItemClicked, setListItemClicked] = useState(null)
    
    return(
        <React.Fragment>
            {/* ----------------------------------- */}
            {/* App Bar and Drawer in Fixed Positon */}
            {/* ----------------------------------- */}
            <AppBar position="fixed" color="inherit" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar} >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => props.handleDrawerOpen()}
                        className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Breadcrumbs aria-label="breadcrumb" >
                        <RouterLink to='/' onClick={()=>setListItemClicked(null)}>
                            <img src={logo} alt = "Logo" className={classes.logo} /> 
                        </RouterLink>
                        <RouterLink to={listItemClicked ?`/${listItemClicked.toLowerCase()}`: '/'} className={classes.link} >
                            <Typography component="h1" variant="h6" >
                                {listItemClicked}
                            </Typography>
                        </RouterLink>
                    </Breadcrumbs>
                    
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
                }}
                open={props.open}
            >
                <div className={classes.toolbarIcon}>
                <Typography variant='h6'>Menu</Typography>
                {/* <IconButton onClick={()=> props.handleDrawerClose()}>
                    <ChevronLeftIcon style={{color:'white'}}/>
                </IconButton> */}
                </div>
                <Divider style={{background:'white'}} />
                <Menu setListItemClicked={setListItemClicked} listItemClicked={listItemClicked}/>
            </Drawer> 
        </React.Fragment>
    )
}
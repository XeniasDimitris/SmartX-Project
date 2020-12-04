import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import ApartmentIcon from '@material-ui/icons/Apartment';
import EventIcon from '@material-ui/icons/Event';
import EcoIcon from '@material-ui/icons/Eco';
import TrafficIcon from '@material-ui/icons/Traffic';
import PeopleIcon from '@material-ui/icons/People';
import CloudIcon from '@material-ui/icons/Cloud';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=> ({
  link:{
    color: 'inherit',
    textDecoration: 'none',    
    
  },
  icons:{
    color:'rgba(255, 255, 255, 0.98)',
  },
  button:{
    "&:hover": {
      backgroundColor:'rgb(22, 29, 39)'
    },
  },
  buttonClicked:{
    backgroundColor:'rgb(18, 24, 32)'
  },
  nestedMenu:{
    paddingLeft: theme.spacing(4),
  }
}))


function ListItemLink(props) {
  const classes = useStyles()
  const { to, primary, setListItemClicked, icon, listItemClicked, nested} = props
  return (
    <RouterLink to={to} onClick={setListItemClicked(primary)} className={classes.link}>
       <ListItem button 
                className={clsx(classes.button,
                          listItemClicked===primary && classes.buttonClicked,
                          nested && classes.nestedMenu)
                }>
          <ListItemIcon style={{minWidth:"40px"}}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={primary}/>
        </ListItem>
    </RouterLink>
  )
}

export default function MainListItems(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  
  const listItemClicked = props.listItemClicked
  const setListItemClicked = (item) => (e) =>{
    props.setListItemClicked(item)
  }
  
  const classes = useStyles()
  
  return (
    <List>
        <ListItem button onClick={handleClick} className={clsx(classes.button)}>
        <ListItemIcon  style={{minWidth:"40px"}}>
            <DashboardIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary='Dashboard'/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={open} timeout={50} unmountOnExit>
          <List component="div" disablePadding >
            <ListItemLink to="/dashboard/weather" primary="Weather" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked}
                          icon={<CloudIcon className={classes.icons}/>}
                          nested={true}  />
            <ListItemLink to="/dashboard/demographics" primary="Demographics" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked} 
                          icon={<PeopleIcon className={classes.icons}/>}
                          nested={true} />
            <ListItemLink to="/dashboard/traffic" primary="Traffic" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked} 
                          icon={<TrafficIcon className={classes.icons}/>}
                          nested={true} />
            <ListItemLink to="/dashboard/pollution" primary="Pollution" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked} 
                          icon={<EcoIcon className={classes.icons}/>}
                          nested={true} />
            <ListItemLink to="/dashboard/dokk1" primary="Dokk1" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked} 
                          icon={<ApartmentIcon className={classes.icons}/>}
                          nested={true} />
            <ListItemLink to="/dashboard/events" primary="Events" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked} 
                          icon={<EventIcon className={classes.icons}/>}
                          nested={true} />
            <ListItemLink to="/dashboard/parkings" primary="Parkings" 
                          setListItemClicked={setListItemClicked} 
                          listItemClicked={listItemClicked} 
                          icon={<LocalParkingIcon className={classes.icons}/>}
                          nested={true} />
          </List>
        </Collapse>
        
        
      {/* <ListItemLink to="/hey2" primary="Hey2" 
                    setListItemClicked={setListItemClicked} 
                    listItemClicked={listItemClicked}
                    icon={<ShoppingCartIcon className={classes.icons}/>} />
      <ListItemLink to="/hey3" primary="Hey3" setListItemClicked={setListItemClicked} 
                    listItemClicked={listItemClicked}
                    icon={<PeopleIcon  className={classes.icons}/>} />
      <ListItemLink to="/hey4" primary="Hey4" setListItemClicked={setListItemClicked} 
                    listItemClicked={listItemClicked}
                    icon={<LayersIcon  className={classes.icons}/>} /> */}
                    
    </List>
  )
}


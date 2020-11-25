import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import List from '@material-ui/core/List';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(()=> ({
  link:{
    color: 'inherit',
    textDecoration: 'none'
  }
}))


function ListItemLink(props) {
  const classes = useStyles()
  const { to, primary, setListItemClicked, icon} = props
  return (
    <RouterLink to={to} onClick={setListItemClicked(primary)} className={classes.link}>
       <ListItem button>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
    </RouterLink>
  )
}

export default function MainListItems(props) {
 
  const setListItemClicked = (item) => (e) =>{
    props.setListItemClicked(item)
  }
  
  
  return (
    <List>
      <ListItemLink to="/dashboard" primary="Dashboard" setListItemClicked={setListItemClicked} icon={<BarChartIcon />} />
      <ListItemLink to="/hey1" primary="Hey1" setListItemClicked={setListItemClicked} icon={<DashboardIcon />} />
      <ListItemLink to="/hey2" primary="Hey2" setListItemClicked={setListItemClicked} icon={<ShoppingCartIcon />} />
      <ListItemLink to="/hey3" primary="Hey3" setListItemClicked={setListItemClicked} icon={<PeopleIcon />} />
      <ListItemLink to="/hey4" primary="Hey4" setListItemClicked={setListItemClicked} icon={<LayersIcon />} />
    </List>
  )
}

// export  secondaryListItems = (
//   <div>
//     <ListSubheader inset>some stuff</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="some stuff" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="some stuff" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="some stuff" />
//     </ListItem>
//   </div>
// );

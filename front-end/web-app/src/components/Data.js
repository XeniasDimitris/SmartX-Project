import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Data(props) {
  const classes = useStyles();
  const data = props.data
  return (
    <React.Fragment>
      <Title>Raw Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>DateTime</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        { data ? 
          <TableBody>
          {  data.map((datarow) => (
            <TableRow >
              <TableCell>{datarow.datetime}</TableCell>
              <TableCell align="right">{datarow.value}</TableCell>
            </TableRow>
          ))}
           </TableBody> : null  
        }
          
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more 
        </Link>
      </div>
    </React.Fragment>
  );
}
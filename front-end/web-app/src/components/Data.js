import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Data(props) {
  const classes = useStyles();
  let data = props.data
  console.log('data',data)
  return (
    <React.Fragment>
      <Title>Raw Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {  data ? data.map((datarow) => (
              <TableRow >
                <TableCell>{datarow.datetime.getFullYear()}</TableCell>
                <TableCell>{datarow.datetime.getMonth()+1}</TableCell>
                <TableCell>{datarow.datetime.getDate()}</TableCell>
                <TableCell>{datarow.datetime.toTimeString().split(' ')[0]}</TableCell>
                <TableCell align="right">{datarow.value}</TableCell>
              </TableRow>
            )): null}
          </TableBody>
        
      </Table> 
    </React.Fragment>
  );
}
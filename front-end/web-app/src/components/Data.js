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

export default function Data() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>some stuff</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>stuff</TableCell>
            <TableCell>stuff</TableCell>
            <TableCell>stuff</TableCell>
            <TableCell>stuff</TableCell>
            <TableCell align="right">stuff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[0,1,2].map((row) => (
            <TableRow key={row}>
              <TableCell>some stuff</TableCell>
              <TableCell>some stuff</TableCell>
              <TableCell>some stuff</TableCell>
              <TableCell>some stuff </TableCell>
              <TableCell align="right">some stuff</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more 
        </Link>
      </div>
    </React.Fragment>
  );
}
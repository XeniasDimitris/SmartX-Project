import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Map from './EventsMap'
import TablePagination from '@material-ui/core/TablePagination';
import Title from '../Title';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>

        <TableCell>{row.title}</TableCell>
        <TableCell>{row.library}</TableCell>
        <TableCell>{row.starttime}</TableCell>
        <TableCell>{row.endtime}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.street}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Place
              </Typography>
              <Map event={row}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollTable(props) {
  let events = props.data
//   const [rowsPerPage, setRowsPerPage] = React.useState(72);
//   const [page, setPage] = React.useState(0);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
  return (
    <React.Fragment>
    <TableContainer style={{height: 700}}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor: 'white'}}><Title>Title</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Library</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Start Time</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>End Time</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>City</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Street</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Place</Title></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((row) => (
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* {events && (<TablePagination
        rowsPerPageOptions={[72, 145, { value: events.length, label: 'All' }]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)} */}
    </React.Fragment>
  );
}

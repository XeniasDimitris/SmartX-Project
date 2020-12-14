import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  dataPresentation:{
    height: 700,
}
}));

export default function Data(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(72);
  let data = props.data
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>

    {/* ----------------------------------------- */}
    {/* Table with the raw data  */}
    {/* ----------------------------------------- */}
     <TableContainer className={classes.dataPresentation}>
      <Table stickyHeader  aria-label="sticky table" >
        <TableHead >
          <TableRow >
            <TableCell style={{backgroundColor: 'white'}}><Title>Year</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Month</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Date</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}}><Title>Time</Title></TableCell>
            <TableCell style={{backgroundColor: 'white'}} align="right"><Title>Value</Title></TableCell>
          </TableRow>
        </TableHead>
          <TableBody >
          {  data ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((datarow) => 
             (
                <TableRow key={datarow.datetime} >
                  <TableCell>{datarow.datetime.getFullYear()}</TableCell>
                  <TableCell>{datarow.datetime.getMonth()+1}</TableCell>
                  <TableCell>{datarow.datetime.getDate()}</TableCell>
                  <TableCell>{datarow.datetime.toTimeString().split(' ')[0]}</TableCell>
                  <TableCell align="right">{datarow.value}</TableCell>
                </TableRow>
            )): null
          }
          </TableBody>
      </Table> 
      </TableContainer>
      {data && (<TablePagination
        rowsPerPageOptions={[72, 145, { value: data.length, label: 'All' }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)}
    </React.Fragment>
  );
}
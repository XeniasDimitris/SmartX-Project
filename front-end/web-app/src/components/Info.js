import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Info() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Some Stuff</Title>
      <Typography component="p" variant="h4">
        Some Stuff
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        some stuff
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          some stuff
        </Link>
      </div>
    </React.Fragment>
  );
}
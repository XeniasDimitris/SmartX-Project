import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title'

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
      <Title>Title</Title>
      <Typography component="p" variant="p">
        paragraph
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        deposit
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          link
        </Link>
      </div>
    </React.Fragment>
  );
}
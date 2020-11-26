import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component="span" variant="h6" color="primary" gutterBottom>
      {props.test.toString()}
    </Typography>
  );
}

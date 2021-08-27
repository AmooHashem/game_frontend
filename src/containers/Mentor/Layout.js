import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '900px !important',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
}));

const Layout = ({ ...props }) => {
  const classes = useStyles();
  let { gameId } = useParams();


  return (
    <>
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
}

export default connect(
  mapStateToProps,
  {
  }
)(Layout);
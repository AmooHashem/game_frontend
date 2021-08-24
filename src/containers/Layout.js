import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import {
  getPlayerAction,
} from '../redux/slices/game';

import AppBar from '../components/Appbar/ResponsiveAppBar';

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

const Layout = ({ getPlayer, ...props }) => {
  const classes = useStyles();
  let { gameId } = useParams();


  useEffect(() => {
    getPlayer({ gameId })
  }, [getPlayer]);

  return (
    <>
      <AppBar mode='FORMULA0' position='relative' />
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
    getPlayer: getPlayerAction,
  }
)(Layout);
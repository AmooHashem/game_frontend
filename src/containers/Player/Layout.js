import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import {
  getPlayerAction,
} from '../../redux/slices/game';

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
    const timer = setInterval(() => {
      getPlayer({ gameId })
    }, 30000);
    return () => clearInterval(timer)
  }, []);

  return (
    <>
      <AppBar mode='FORMULA0' position='relative' />
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

const mapStateToProps = () => {
}

export default connect(
  mapStateToProps,
  {
    getPlayer: getPlayerAction,
  }
)(Layout);
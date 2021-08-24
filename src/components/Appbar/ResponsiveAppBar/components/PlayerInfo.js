import { makeStyles, Chip } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  avatar: {},
}));

function Index({ score }) {
  const classes = useStyles();
  return (
    <Chip variant="outlined" color="primary" label={`سکه‌ی شما: ${score}`} />
  );
}

const mapStateToProps = (state) => ({
  score: state.game.player?.score || 0,
});

export default connect(mapStateToProps)(Index);
import { makeStyles, Chip } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { toPersianNumber } from '../../../../utils/translateNumber';

const useStyles = makeStyles(() => ({
  avatar: {},
}));

function Index({ score }) {
  const classes = useStyles();
  return (
    <div style={{ direction: 'ltr' }}>
      <Chip variant="outlined" color="primary" label={`چوق شما: ${toPersianNumber(score)}`} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  score: state.game.player?.score || 0,
});

export default connect(mapStateToProps)(Index);
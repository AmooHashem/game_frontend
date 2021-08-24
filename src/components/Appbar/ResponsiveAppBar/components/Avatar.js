import { Avatar, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { stringToColor } from '../../../../utils/stringToColor';

const useStyles = makeStyles(() => ({
  avatar: {},
}));

function AvatarComponent({ name = 'f' }) {
  const classes = useStyles();
  return (
    <Tooltip title={name} arrow>
      <Avatar
        style={{ backgroundColor: stringToColor(name) }}
        alt="logo"
        className={classes.avatar}>
        {name[0]}
      </Avatar>
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  name: state.game.player?.name,
});

export default connect(mapStateToProps)(AvatarComponent);

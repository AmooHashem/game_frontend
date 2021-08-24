import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

import {
  loginAction,
} from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';
import { toEnglishNumber, toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
}));

const InputFields = ({
  isFetching,
  login,
  addNotification,
  token,
}) => {

  const classes = useStyles();
  const [data, setData] = useState({
    password: '',
    username: '',
  });

  if (token) {
    return (
      <Redirect to='/game/1/player_problems/' />
    );
  }

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  };

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const doLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      addNotification({
        message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!',
        type: 'error',
      });
      return;
    }
    login(data);
  };

  return (
    <>
      <Grid item>
        <TextField
          autoComplete='off'
          variant='outlined'
          fullWidth
          onChange={(e) => {
            if (isJustDigits(e.target.value)) {
              putData(e);
            }
          }}
          value={data.username}
          name='username'
          label='شماره تلفن همراه'
          inputProps={{ className: 'ltr-input' }}
          type='tel'
        />
      </Grid>

      <Grid item>
        <TextField
          autoComplete='off'
          variant='outlined'
          fullWidth
          onBlur={putData}
          label="گذرواژه"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />
      </Grid>

      <Grid container item direction="row" justify="center">
        <Button
          onClick={doLogin}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          بزن بریم
        </Button>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(InputFields);
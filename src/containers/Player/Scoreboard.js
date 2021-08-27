import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import TextWidget from '../../components/Widget/TextWidget';
import {
  getAllGameSubjectsAction,
  getOneAnswerForCorrectionAction,
  getScoreboardAction,
  setAnswerMarkAction,
} from '../../redux/slices/game';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import { toPersianNumber } from '../../utils/translateNumber';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  textArea: {
    width: '100%',
    resize: 'vertical',
    borderRadius: '10px',
    minHeight: '100px',
    padding: theme.spacing(1),
  }
}))

const Index = ({
  getScoreboard,

  players,
}) => {
  const classes = useStyles();
  const { gameId } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      getScoreboard({ gameId })
    }, 30000);
    return () => clearInterval(timer)
  }, [getScoreboard]);

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Typography variant="h1" align="center">{'«جدول امتیازات»'}</Typography>
        </Grid>
        <Grid item container spacing={2} alignItems='flex-start' justify='center'>
          <Grid item container xs={12} md={8} direction='column'>
            <TableContainer component={Paper}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>رتبه</TableCell>
                    <TableCell align='center'>نام تیم</TableCell>
                    <TableCell align='center'>چوق</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((player, index) =>
                    <TableRow key={index}>
                      <TableCell align='center'>
                        {toPersianNumber(index + 1)}
                      </TableCell>
                      <TableCell align='center'>
                        {player.name}
                      </TableCell>
                      <TableCell align='center'>
                        {toPersianNumber(player.score)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {players.length == 0 &&
                <Typography style={{ padding: '10px' }} variant='h6' align='center'>
                  {'تیمی وجود ندارد!'}
                </Typography>
              }
            </TableContainer>
          </Grid>
        </Grid>
      </Grid >
    </Layout >
  )
}

const mapStateToProps = (state) => ({
  players: state.game.players,
  isFetching: state.game.isFetching,
})

export default connect(
  mapStateToProps,
  {
    getScoreboard: getScoreboardAction,
    getAllGameSubjects: getAllGameSubjectsAction,
    addNotification: addNotificationAction,
    setAnswerMark: setAnswerMarkAction,
    getOneAnswerForCorrection: getOneAnswerForCorrectionAction,
  }
)(Index)
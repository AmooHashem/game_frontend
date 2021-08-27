import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import GavelIcon from '@material-ui/icons/Gavel';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import CreateAuction from '../../components/Dialog/CreateAuction';
import {
  buyRandomProblemAction,
  getAllGameSubjectsAction,
  getAllPlayerProblemsAction,
} from '../../redux/slices/game';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import { toPersianNumber } from '../../utils/translateNumber';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))

const DIFFICULTY = {
  'EASY': 'آسان',
  'MEDIUM': 'متوسط',
  'HARD': 'سخت',
}

const STATUS = {
  'RECEIVED': 'دریافت‌شده',
  'DELIVERED': 'در انتظار تصحیح',
  'SCORED': 'تصحیح‌شده',
}

const PlayerProblems = ({
  getAllPlayerProblems,
  getAllGameSubjects,
  buyRandomProblem,

  addNotification,

  allGameSubjects,
  allPlayerProblems,
  isFetching
}) => {
  const classes = useStyles();
  let { gameId } = useParams();
  const [properties, setProperties] = useState({ difficulty: '', subject: '' });
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [auctionDialogProblem, setAuctionDialogProblem] = useState(false);

  useEffect(() => {
    getAllPlayerProblems({ gameId });
    getAllGameSubjects({ gameId });
  }, [])

  const handleSelect = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    })
  }

  const buyProblem = (e) => {
    if (!properties.difficulty) {
      addNotification({
        message: 'لطفا سختی مسئله‌ی درخواستی را وارد کنید.',
        type: 'error',
      });
      return;
    }
    if (!properties.subject) {
      addNotification({
        message: 'لطفا مبحث مسئله‌ی درخواستی را وارد کنید.',
        type: 'error',
      });
      return;
    }
    buyRandomProblem({ gameId, ...properties })
  }

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Typography variant="h1" align="center">{'«مسئله‌های من»'}</Typography>
        </Grid>
        <Grid item container spacing={2} alignItems='flex-start'>
          <Grid item container xs={12} md={8} direction='column'>
            <TableContainer component={Paper}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>عنوان</TableCell>
                    <TableCell align='center'>مبحث</TableCell>
                    <TableCell align='center'>سختی</TableCell>
                    <TableCell align='center'>وضعیت</TableCell>
                    <TableCell align='center'>هزینه</TableCell>
                    <TableCell align='center'>پاداش</TableCell>
                    {/* <TableCell align='center'>مزایده</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPlayerProblems.map((problem, index) =>
                    <TableRow key={index}>
                      <TableCell align='center'>
                        <Button
                          disabled={problem.status != 'RECEIVED'}
                          href={`/game/${gameId}/problem/${problem.problem?.id}/`}>
                          {problem.problem?.title}
                        </Button>
                      </TableCell>
                      <TableCell align='center'>{problem.problem?.subject?.title}</TableCell>
                      <TableCell align='center'>{DIFFICULTY[problem.problem?.difficulty]}</TableCell>
                      <TableCell align='center'>{STATUS[problem.status]}</TableCell>
                      <TableCell align='center'>{toPersianNumber(problem.auction_cost || problem.problem?.cost || 0)}</TableCell>
                      <TableCell align='center'>{problem.mark == -1 ? '-' : toPersianNumber(problem.mark || 0)}</TableCell>
                      {/* <TableCell align='center'>
                        <Tooltip title={
                          problem.from_auction
                            ? 'شما این مسئله را در مزایده خریده‌اید و دیگر نمی‌توانید آن را به مزایده بگذارید.'
                            : (problem.is_sold
                              ? 'شما پیشتر این مسئله را در مزایده فروخته‌اید.'
                              : (problem.mark == -1
                                ? 'پاسخ این مسئله هنوز تصحیح نشده است.'
                                : (problem.mark >= 2
                                  ? 'چوق دریافتی شما از این سوال، ۰ یا ۱ نیست؛ به همین خاطر نمی‌توانید آن را به مزایده بگذارید.'
                                  : 'قراردادن مسئله در تابلوی مزایده')))
                        } arrow>
                          <IconButton
                            onClick={
                              (problem.mark >= 2 || problem.mark == -1 || problem.from_auction || problem.is_sold)
                                ? () => { }
                                : () => setAuctionDialogProblem(problem.problem?.id)}>
                            <GavelIcon />
                          </IconButton>
                        </Tooltip>

                      </TableCell> */}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {allPlayerProblems.length == 0 &&
                <Typography style={{ padding: '10px' }} variant='h6' align='center'>
                  {'هنوز سوالی نگرفته‌اید!'}
                </Typography>
              }
            </TableContainer>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Paper className={classes.paper}>
              <Grid item container direction='column' spacing={2}>
                <Grid item>
                  <Typography variant="h2" align='center'>مسئله‌ی جدید</Typography>
                </Grid>
                <Grid item>
                  <FormControl size='small' variant="outlined" fullWidth>
                    <InputLabel>مبحث</InputLabel>
                    <Select
                      className={classes.dropDown}
                      onBlur={handleSelect}
                      name='subject'
                      label='مبحث'
                    >
                      {allGameSubjects.map((subject, index) => (
                        <MenuItem key={index} value={subject.id}>{subject.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl >
                </Grid>
                <Grid item>
                  <FormControl size='small' variant="outlined" fullWidth>
                    <InputLabel>سختی</InputLabel>
                    <Select
                      className={classes.dropDown}
                      onBlur={handleSelect}
                      name='difficulty'
                      label='سختی'
                    >
                      {/* <MenuItem value={'EASY'}>{'آسان'}</MenuItem> */}
                      <MenuItem value={'MEDIUM'}>{'متوسط'}</MenuItem>
                      <MenuItem value={'HARD'}>{'سخت'}</MenuItem>
                    </Select>
                  </FormControl >
                </Grid>
                <Grid item>
                  <Button disabled fullWidth variant='contained' color='primary' onClick={() => setDialogStatus(true)}>دریافت</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={buyProblem}
      />
      <CreateAuction
        problemId={auctionDialogProblem}
        open={auctionDialogProblem}
        handleClose={() => { setAuctionDialogProblem(!auctionDialogProblem) }}
      />
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  allGameSubjects: state.game.allGameSubjects,
  allPlayerProblems: state.game.allPlayerProblems,
  isFetching: state.game.isFetching,
})

export default connect(
  mapStateToProps,
  {
    addNotification: addNotificationAction,
    getAllPlayerProblems: getAllPlayerProblemsAction,
    getAllGameSubjects: getAllGameSubjectsAction,
    buyRandomProblem: buyRandomProblemAction,
  }
)(PlayerProblems)
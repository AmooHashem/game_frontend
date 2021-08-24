import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import TextWidget from '../../components/Widget/TextWidget';
import {
  correctAnswer,
  getPlayerSingleProblemForCorrection,
} from '../../redux/actions/game';

const BASE_URL_OF_FILES_ON_DATABASE = 'https://backend.interkarsolar.ir/media/'

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
  getPlayerSingleProblemForCorrection,
  correctAnswer,
  playerSingleProblem,
  isFetching,
}) => {
  const classes = useStyles();
  const [mark, setMark] = useState();
  const [problemText, setProblemText] = useState('');
  const [answerText, setAnswerText] = useState('')

  const isDigit = (string) => {
    var regex = new RegExp(`\\d{${string.length}}`);
    if (regex.test(string)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    getPlayerSingleProblemForCorrection()
  }, [getPlayerSingleProblemForCorrection])

  useEffect(() => {
    if (playerSingleProblem?.text_answer) {
      setAnswerText(<TextWidget text={playerSingleProblem?.text_answer} />)
    }
    if (playerSingleProblem?.problem?.text) {
      setProblemText(<TextWidget text={playerSingleProblem?.problem?.text} />)
    }
  }, [playerSingleProblem])

  const submitScore = () => {
    if (!mark || (!isDigit(mark) && mark != null)) {
      toast.error('نمره فقط می‌تونه رقم انگلیسی باشه!');
      return;
    }
    if (mark < 0 || mark > 10) {
      toast.error('لطفاً یک نمره بین ۰ تا ۱۰ وارد کن!');
      return;
    }
    correctAnswer({ mark, player_single_problem_id: playerSingleProblem?.id })
  }

  console.log(playerSingleProblem)
  console.log(mark)

  return (
    <Container className={`${classes.centerItems}`}>
      <Grid container justify='center' spacing={2}>
        <Grid item container justify='center' alignItems='flex-start' xs={12} sm={9} md={6} spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                  <Typography variant='h2'>
                    {playerSingleProblem?.problem?.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {problemText}
                </Grid>
                <Grid item>
                  <Typography variant='h2'>
                    {'پاسخ تایپ‌شده'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {answerText}
                </Grid>
                {/* {fileAnswer &&
                  <Grid item xs={12}>
                    <a href={fileAnswer} >
                      {'دانلود فایل پاسخ'}
                    </a>
                  </Grid>
                } */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>


        <Grid item container justify='center' alignItems='flex-start' xs={12} sm={9} md={3} spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                  <Typography align='center' variant='h2'>
                    {'نمره‌دهی'}
                  </Typography>
                </Grid>
                <Grid item >
                  <TextField fullWidth label='نمره' variant='outlined'
                    value={mark} onChange={(e) => setMark(e.target.value)} />
                </Grid>
                <Grid item >
                  <Button disabled={isFetching} variant='contained' fullWidth color='primary' onClick={submitScore}>
                    {'ثبت'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.game.isFetching,
  playerSingleProblem: state.game.playerSingleProblem,
})

export default connect(
  mapStateToProps,
  {
    getPlayerSingleProblemForCorrection,
    correctAnswer,
  }
)(Index)
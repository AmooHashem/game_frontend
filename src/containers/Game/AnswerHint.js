import React, { useState, useEffect, useRef } from 'react';
import {
  makeStyles,
  Container,
  Grid,
  ButtonGroup,
  Button,
  Typography,
  Paper,
  Divider,
  TextField,
} from '@material-ui/core';
import {
  getHint,
  answerHint,
} from '../../redux/actions/game';
import { useParams } from "react-router-dom";
import TextWidget from '../../components/Widget/TextWidget';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

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
  getHint,
  answerHint,
  hint,
  isFetching,
}) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState();
  const [problemText, setProblemText] = useState('');
  const [hintQuestion, setHintQuestion] = useState('')

  useEffect(() => {
    getHint()
  }, [getHint])

  useEffect(() => {
    if (hint?.questioned_problem?.text) {
      setProblemText(<TextWidget text={hint?.questioned_problem?.text} />)
    }
    if (hint?.hint?.question) {
      setHintQuestion(<TextWidget text={hint?.hint?.question} />)
    }
  }, [hint])

  const submitAnswer = () => {
    if (!answer) {
      toast.error('لطفاً به سوال این دانش‌آموز پاسخی بدهید!');
      return;
    }
    answerHint({ answer, hint_id: hint?.hint?.id })
  }

  console.log(hint)

  return (
    <Container className={`${classes.centerItems}`}>
      <Grid container justify='center' spacing={2}>
        <Grid item container justify='center' alignItems='flex-start' xs={12} sm={9} md={6} spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                  <Typography variant='h2' align='center'>
                    {hint?.questioned_problem?.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {problemText}
                </Grid>
                <Grid item>
                  <Typography variant='h2' align='center'>
                    {'سوال دانش‌آموز'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {hintQuestion}
                </Grid>
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
                    {'پاسخ شما'}
                  </Typography>
                </Grid>
                <Grid item >
                  <TextField multiline rows={3} fullWidth label='پاسخ' variant='outlined'
                    value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </Grid>
                <Grid item >
                  <Button disabled={isFetching} variant='contained' fullWidth color='primary' onClick={submitAnswer}>
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
  hint: state.game.hint,
})

export default connect(
  mapStateToProps,
  {
    getHint,
    answerHint,
  }
)(Index)
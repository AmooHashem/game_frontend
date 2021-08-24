
import {
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'

import AreYouSure from '../../components/Dialog/AreYouSure';
import {
  getPlayerInfo,
  getProblemHints,
  getSpecificMultipleProblem,
  getSpecificSingleProblem,
  submitMultipleProblemAnswer,
  submitNewHint,
  submitSingleProblemAnswer,
} from '../../redux/actions/game';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar'
import TinyPreview from '../components/tiny_editor/react_tiny/Preview';
import TinyEditor from '../components/tiny_editor/react_tiny/TinyEditorComponent';
import { toPersianNumber } from '../utils/translateNumber';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const ViewProblem = ({
  getSpecificSingleProblem,
  getSpecificMultipleProblem,
  getPlayerInfo,
  submitSingleProblemAnswer,
  submitMultipleProblemAnswer,
  getProblemHints,
  submitNewHint,
  hints,
  singleProblem,
  multipleProblem,
  isFetching,
}) => {
  const classes = useStyles();
  const [problem, setProblem] = useState();
  let { gameId, problemId, singleOrMultiple } = useParams();
  const [textAnswer, setTextAnswer] = useState('');
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [isDialogOpen2, setDialogStatus2] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    getPlayerInfo({ gameId });
    if (singleOrMultiple === 'single') {
      getSpecificSingleProblem({ gameId, problemId });
    } else {
      getProblemHints({ gameId, problemId })
      getSpecificMultipleProblem({ gameId, problemId });
    }
  }, [getProblemHints, getSpecificSingleProblem, getSpecificMultipleProblem, getPlayerInfo, gameId, problemId, singleOrMultiple]);

  useEffect(() => {
    if (singleProblem) {
      setProblem(singleProblem.problem)
    }
    if (multipleProblem) {
      setProblem(multipleProblem)
    }
  }, [singleProblem, multipleProblem,])


  // if (singleProblem?.status === 'DELIVERED' ||
  //   singleProblem?.status === 'SCORED' ||
  //   multipleProblem?.status === 'DELIVERED' ||
  //   multipleProblem?.status === 'SCORED') {
  //   return (<Redirect to={`/game/${gameId}/my_problems/`} />)
  // }

  const submitAnswer = () => {
    console.log(textAnswer)
    if (singleOrMultiple === 'single') {
      submitSingleProblemAnswer({ gameId, problemId, answer: textAnswer });
    } else {
      console.log(textAnswer)
      submitMultipleProblemAnswer({ gameId, problemId, answer: textAnswer });
    }
  }


  const submitHint = () => {
    submitNewHint({ gameId, problemId, question, single_or_multiple: singleOrMultiple })
  }

  return (
    <>
      <ResponsiveAppBar mode="FORMULA0" position={'relative'} hideOnScroll={false} />
      <Container className={classes.container}>
        <Grid container spacing={2} justify='center'>
          <Grid item xs={12}>
            <Typography variant='h1' align="center">{problem?.title ? `«${problem?.title}»` : ''}</Typography>
          </Grid>
          <Grid container item spacing={2} xs={12} md={10} lg={9} justify='center'>
            <Grid container item direction='column' xs={12} md={8} spacing={2}>
              <Grid item>
                <Paper className={classes.paper}>
                  <Grid item container direction='column'>
                    <Grid item>
                      <Typography gutterBottom variant='h3' align='center'>صورت مسئله</Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid item>
                      <TinyPreview
                        frameProps={{
                          frameBorder: '0',
                          scrolling: 'no',
                          width: '100%',
                        }}
                        content={problem?.text} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <Grid item container direction='column' spacing={1}>
                    <Grid item>
                      <Typography gutterBottom variant='h3' align='center'>پاسخ</Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid item>
                      {singleProblem &&
                        <TinyEditor
                          initialValue={singleProblem?.text_answer}
                          onChange={setTextAnswer} />
                      }
                      {multipleProblem &&
                        <TextField
                          onChange={e => setTextAnswer(e.target.value)}
                          label='پاسخ خود را وارد کنید'
                          type='text'
                          inputProps={{ className: 'ltr-input' }}
                          variant='outlined'
                          fullWidth />
                      }
                    </Grid>
                    <Grid item>
                      <Button fullWidth variant='contained' color='primary' onClick={() => setDialogStatus(true)}>ثبت پاسخ</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {singleOrMultiple === 'multiple' &&
                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid item container direction='column' spacing={1}>
                      <Grid item>
                        <Typography gutterBottom variant='h3' align='center'>راهنمایی‌ها</Typography>
                      </Grid>
                      <Divider className={classes.divider} />
                      {
                        hints.map(hint => {
                          return (
                            <>
                              <Grid item>
                                <Chip size='small' color='primary' label='سوال' />
                                <Typography>{hint?.question}</Typography>
                                {hint.answer &&
                                  <>
                                    <Chip size='small' color='primary' label='جواب' />
                                    <Typography>{hint?.answer}</Typography>
                                  </>
                                }
                              </Grid>
                              <Divider className={classes.divider} />
                            </>
                          )
                        })
                      }
                      <Grid item>
                        <TextField
                          multiline rows={3} fullWidth variant='outlined'
                          onBlur={(e) => setQuestion(e.target.value)}
                          defaultValue='اگر ابهامی دارید، با پرداخت ۵۰ سکه اینجا بپرسید' />
                        <Button
                          onClick={() => setDialogStatus2(true)}
                          size='small' variant='contained'
                          color='secondary' fullWidth >
                          درخواست راهنمایی
                      </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              }
            </Grid>

          </Grid>
        </Grid >
      </Container>
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={submitAnswer}
      />
      <AreYouSure
        open={isDialogOpen2}
        handleClose={() => { setDialogStatus2(!isDialogOpen2) }}
        callBackFunction={submitHint}
      />
    </>
  );

}

const mapStateToProps = (state) => {
  return ({
    singleProblem: state.game.singleProblem,
    multipleProblem: state.game.multipleProblem,
    hints: state.game.hints,
  });
}

export default connect(
  mapStateToProps,
  {
    getSpecificSingleProblem,
    getSpecificMultipleProblem,
    getPlayerInfo,
    submitSingleProblemAnswer,
    submitMultipleProblemAnswer,
    getProblemHints,
    submitNewHint,
  }
)(ViewProblem);
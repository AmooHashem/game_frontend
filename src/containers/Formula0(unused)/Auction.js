import React, { useState, useEffect } from 'react';
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
  getProblems,
  getProblem,
  getTeamData,
} from '../../redux/actions/formula0';
import ResponsiveAppBar from '../../components/Appbar/ResponsiveAppBar'
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
  team_id,
  getProblems,
  getProblem,
  getTeamData,
}) => {
  const classes = useStyles();
  const [isFetching, setIsFetching] = useState(false);
  const [score, setScore] = useState();
  const [comment, setComment] = useState();
  const [answerId, setAnswerId] = useState();
  const [question, setQuestion] = useState();
  const [textAnswer, setTextAnswer] = useState();
  const [fileAnswer, setFileAnswer] = useState();

  useEffect(() => {
    getTeamData({ team_id });
  }, [])

  const fetchAnswer = async () => {
    getProblems({ team_id: 'sos-mast' });
    getProblem({ team_id: 'sos-mast', id: 7 })
  }

  const submitScore = async () => {

  }

  return (
    <>
      <ResponsiveAppBar mode="FORMULA0" hideOnScroll={false} />

      <Container className={`${classes.centerItems}`}>

        <Grid container justify='center' spacing={2}>

          <Grid item container justify='flex-start' alignItems='center' xs={12} sm={9} spacing={2}>
            <Grid item >
              <TextField label='??????????????? ???????? ???? ???????? ????????' variant='outlined' value={answerId} onChange={(e) => setAnswerId(e.target.value)} />
            </Grid>
            <Grid item >
              <Button disabled={!answerId || isFetching} variant='contained' color='primary' onClick={fetchAnswer}>
                {'???????????? ????????'}
              </Button>
            </Grid>
          </Grid>

          {question &&
            <>
              <Grid item container justify='center' alignItems='flex-start' xs={12} sm={9} md={6} spacing={1}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Grid container direction='column' spacing={2} >
                      <Grid item>
                        <Typography variant='h2'>
                          {'???????? ????????'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {question}
                      </Grid>
                      <Grid item>
                        <Typography variant='h2'>
                          {'???????? ?????????????????'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {textAnswer}
                      </Grid>
                      {fileAnswer &&
                        <Grid item xs={12}>
                          <a href={fileAnswer} >
                            {'???????????? ???????? ????????'}
                          </a>
                        </Grid>
                      }
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
                          {'?????????????????'}
                        </Typography>
                      </Grid>
                      <Grid item >
                        <TextField fullWidth label='????????' variant='outlined' value={score} onChange={(e) => setScore(e.target.value)} />
                      </Grid>
                      <Grid item>
                        <Typography variant='caption'>
                          {'?????? ????????:'}
                        </Typography>
                        <textarea value={comment} className={classes.textArea} onChange={(e) => setComment(e.target.value)} />
                      </Grid>
                      <Grid item >
                        <Button disabled={isFetching} variant='contained' fullWidth color='primary' onClick={submitScore}>
                          {'??????'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </>
          }
        </Grid>
      </Container>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  team_id: state.formula0.team_id,
  isFetching: state.exam.isFetching,
  examQuestionList: state.exam.examQuestionList,
  question: state.exam.question,
})

export default connect(
  mapStateToProps,
  {
    getProblems,
    getProblem,
    getTeamData,
  }
)(Index)
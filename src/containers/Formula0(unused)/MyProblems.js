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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  getProblem,
  getTeamData,
  getProblems,
  requestProblem,
} from '../../redux/actions/formula0';
import ResponsiveAppBar from '../../components/Appbar/ResponsiveAppBar'
import { useParams } from "react-router-dom";
import TextWidget from '../../components/Widget/TextWidget';
import { connect } from 'react-redux';
import { toast } from '../Game(unused)/node_modules/react-toastify';
import ProblemCard from './ProblemCard';

const PROBLEM_SUBJECTS = [
  [0, 'اقتصاد - سطح ۱'],
  [1, 'اقتصاد - سطح ۲'],
  [2, 'ریاضی - سطح ۱'],
  [3, 'ریاضی - سطح ۲'],
  [4, 'زیست - سطح ۱'],
  [5, 'زیست - سطح ۲'],
  [6, 'شیمی - سطح ۱'],
  [7, 'شیمی - سطح ۲'],
  [8, 'فیزیک - سطح ۱'],
  [9, 'فیزیک - سطح ۲'],
  [10, 'کامپیوتر - سطح ۱'],
  [11, 'کامپیوتر - سطح ۲'],
  [12, 'نجوم - سطح ۱'],
  [13, 'نجوم - سطح ۲'],
]

const useStyles = makeStyles((theme) => ({
  centerItems: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(10),
    minHeight: '90vh',
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
  },
  getProblemSection: {
    width: '300px',
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10,
  },
  formControl: {
    width: '100%'
  },
  dropDown: {
    minWidth: '100px',
  },
}))

const Index = ({
  team_id,
  problems,

  getProblems,
  getProblem,
  getTeamData,
  requestProblem,
}) => {
  const classes = useStyles();
  const [subject, setSubject] = useState();

  useEffect(() => {
    getTeamData({ team_id });
    getProblems({ team_id })
  }, [])

  const doGetProblem = () => {
    if (!subject) {
      toast.error('لطفاً یک موضوع انتخاب کنید.');
      return;
    }
    requestProblem({ team_id, subject })
  }

  return (
    <>
      <ResponsiveAppBar mode="FORMULA0" position={'relative'} hideOnScroll={false} />
      <Container className={`${classes.centerItems}`}>
        <Grid xs={12} container justify='center' spacing={2}>

          <div className={classes.getProblemSection}>
            <Grid item container justify='center' alignItems='center' spacing={2}>
              <Grid item xs={7} >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-required-label">{'موضوع مسئله'}</InputLabel>
                  <Select
                    className={classes.dropDown}
                    value={subject}
                    onClick={(e) => setSubject(e.target.value)}
                    label='موضوع مسئله'
                  >
                    {
                      PROBLEM_SUBJECTS.map((subject, index) => (
                        <MenuItem key={index} value={subject[0]}>{subject[1]}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl >
              </Grid>
              <Grid item xs={5}>
                <Button onClick={doGetProblem} variant='contained' size='large' color='primary' fullWidth >
                  {'دریافت'}
                </Button>
              </Grid>
            </Grid>
          </div>

          {problems.map((problem, index) => {
            return (
              <Grid item key={index}>
                <ProblemCard
                  name={problem.name}
                  score={problem.score}
                  status={problem.status}
                  subject={problem.subject} />
              </Grid>
            )
          })}

        </Grid>
      </Container>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  team_id: state.account.team_id,
  problems: state.formula0.problems ? state.formula0.problems : [],
})

export default connect(
  mapStateToProps,
  {
    getProblems,
    getProblem,
    getTeamData,
    requestProblem,
  }
)(Index)
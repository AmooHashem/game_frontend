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
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import TinyEditor from '../../components/tiny_editor/react_tiny/TinyEditorComponent';
import {
  addProblemAction,
  getAllGameSubjectsAction,
  getOneAnswerForCorrectionAction,
  setAnswerMarkAction,
} from '../../redux/slices/game';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
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
  addNotification,
  getAllGameSubjects,
  addProblem,

  allGameSubjects,
  isFetching,
}) => {
  const classes = useStyles();
  const { gameId } = useParams();

  const [properties, setProperties] = useState({
    title: '',
    text: '',
    difficulty: '',
    subject: '',
    cost: '',
    answer: '',
  });
  const [isDialogOpen, setDialogStatus] = useState(false);

  useEffect(() => {
    getAllGameSubjects({ gameId });
  }, [getAllGameSubjects])

  const handleSelect = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    })
  }

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  };


  const handleAddProblem = () => {
    const { title, text, difficulty, subject, cost, answer } = properties;
    if (!title || !text || !difficulty || !subject || !cost) {
      addNotification({
        message: 'لطفاً همه‌ی موارد رو پر کنید.',
        type: 'error',
      });
      return;
    }
    addProblem({ gameId, title, text, difficulty, subject, cost, answer });
  }

  console.log(properties)

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Typography variant="h1" align="center">{'«افزودن مسئله»'}</Typography>
        </Grid>
        <Grid item container spacing={2} alignItems='flex-start'>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Grid item container direction='column' spacing={1}>
                <Grid item>
                  <Typography gutterBottom variant='h3' align='center'>صورت مسئله</Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item>
                  <TinyEditor
                    onChange={(text) => {
                      setProperties({
                        ...properties,
                        text,
                      })
                    }} />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth variant='outlined'
                    label='پاسخ کوتاه (اختیاری)'
                    name='answer'
                    onChange={handleSelect}
                    value={properties.answer} />
                </Grid>
                <Grid item>
                  <Button fullWidth variant='contained' color='primary' onClick={() => setDialogStatus(true)}>ذخیره</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                  <TextField
                    fullWidth variant='outlined'
                    label='عنوان مسئله'
                    name='title'
                    onChange={handleSelect}
                    value={properties.title} />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>مبحث</InputLabel>
                    <Select
                      value={properties.subject}
                      onChange={handleSelect}
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
                  <TextField
                    fullWidth variant='outlined'
                    label='هزینه‌ی دریافت'
                    name='cost'
                    onChange={(e) => {
                      if (isJustDigits(e.target.value)) {
                        handleSelect(e);
                      }
                    }}
                    value={properties.cost} />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>سختی</InputLabel>
                    <Select
                      value={properties.difficulty}
                      onChange={handleSelect}
                      name='difficulty'
                      label='سختی'
                    >
                      <MenuItem value={'EASY'}>{'آسان'}</MenuItem>
                      <MenuItem value={'MEDIUM'}>{'متوسط'}</MenuItem>
                      <MenuItem value={'HARD'}>{'سخت'}</MenuItem>
                    </Select>
                  </FormControl >
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={handleAddProblem}
      />
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  allGameSubjects: state.game.allGameSubjects,
  isFetching: state.game.isFetching,
  playerAnswer: state.game.playerAnswer,
})

export default connect(
  mapStateToProps,
  {
    addProblem: addProblemAction,
    getAllGameSubjects: getAllGameSubjectsAction,
    addNotification: addNotificationAction,
    setAnswerMark: setAnswerMarkAction,
    getOneAnswerForCorrection: getOneAnswerForCorrectionAction,
  }
)(Index)
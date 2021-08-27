
import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import TinyPreview from '../../components/tiny_editor/react_tiny/Preview';
import TinyEditor from '../../components/tiny_editor/react_tiny/TinyEditorComponent';
import {
  answerProblemAction,
  getOnePlayerProblemAction
} from '../../redux/slices/game';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
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
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const ViewProblem = ({
  answerProblem,
  getOnePlayerProblem,
  addNotification,

  getSpecificSingleProblem,
  getSpecificMultipleProblem,
  getPlayerInfo,
  getProblemHints,
  hints = [],
  playerProblem,
}) => {
  const classes = useStyles();
  let { gameId, problemId } = useParams();
  const [problem, setProblem] = useState();
  const [text, setText] = useState();
  const [file, setFile] = useState({ file: '', value: '' });
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [isDialogOpen2, setDialogStatus2] = useState(false);
  const [, setHint] = useState('');

  useEffect(() => {
    getOnePlayerProblem({ gameId, problemId })
  }, [getProblemHints, getSpecificSingleProblem, getSpecificMultipleProblem, getPlayerInfo, gameId, problemId]);

  useEffect(() => {
    setProblem(playerProblem?.problem)
  }, [playerProblem])

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        setFile({
          file: e.target.files[0],
          value: e.target.value,
        });
      } else {
        setFile('')
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const submitAnswer = () => {
    if (!file?.file && !text) {
      addNotification({
        message: 'حداقل یک متن یا یک فایل برای پاسخ سوال قرار دهید.',
        type: 'error',
      });
      return;
    }
    answerProblem({ gameId, problemId, text, file: file.file })
  }


  const clearFile = () => {
    setFile({ file: '', value: '' });
  }

  const submitHint = () => {
    // submitNewHint({ gameId, problemId, question: hint })
  }

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Typography variant='h1' align="center">{problem?.title ? `«${problem?.title}»` : ''}</Typography>
        </Grid>
        <Grid container item spacing={2} justify='center'>
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
                    <TinyEditor
                      initialValue={problem?.text_answer}
                      onChange={setText} />
                  </Grid>
                  <Grid item container spacing={2} alignItems='center'>
                    <Grid item>
                      <Button variant='contained' color='secondary' onClick={() => document.getElementById('userProfilePicture').click()}>
                        {'انتخاب فایل'}
                      </Button>
                      <input
                        value={file.value} accept="application/pdf,image/*"
                        id='userProfilePicture' type="file"
                        style={{ display: 'none' }} onChange={handleFileChange} />
                    </Grid>
                    <Grid item>
                      {file.file &&
                        <Grid container justify='center' alignItems='center'>
                          <Grid item>
                            <Button
                              size="small"
                              startIcon={
                                <IconButton size='small' onClick={clearFile}>
                                  <ClearIcon />
                                </IconButton>}
                              endIcon={<DescriptionOutlinedIcon />}
                              className={classes.lastUploadButton}>
                              {file.file?.name}
                            </Button>
                          </Grid>
                        </Grid>
                      }
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button fullWidth variant='contained' color='primary' onClick={() => setDialogStatus(true)}>ثبت پاسخ</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* <Grid item>
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
                      onBlur={(e) => setHint(e.target.value)}
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
            </Grid> */}
          </Grid>
        </Grid>
      </Grid >
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
    </Layout>
  );

}

const mapStateToProps = (state) => ({
  playerProblem: state.game.playerProblem,
  singleProblem: state.game.singleProblem,
  multipleProblem: state.game.multipleProblem,
  hints: state.game.hints,
});


export default connect(
  mapStateToProps,
  {
    answerProblem: answerProblemAction,
    getOnePlayerProblem: getOnePlayerProblemAction,
    addNotification: addNotificationAction,
    // getSpecificSingleProblem,
    // getSpecificMultipleProblem,
    // getPlayerInfo,
    // submitSingleProblemAnswer,
    // submitMultipleProblemAnswer,
    // getProblemHints,
    // submitNewHint,
  }
)(ViewProblem);
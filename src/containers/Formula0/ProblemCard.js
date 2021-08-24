import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { toPersianNumber } from '../../utils/translateNumber';
import {
  Paper,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

const PROBLEM_STATUS = {
  0: 'گرفته نشده',
  1: 'گرفته شده',
  2: 'در حال تصحیح',
  3: 'صحیح شده',
  4: 'به مزایده گذاشته شده',
  5: 'در مزایده واگذار شده',
}

const PROBLEM_SUBJECTS = {
  0: 'اقتصاد - سطح ۱',
  1: 'اقتصاد - سطح ۲',
  2: 'ریاضی - سطح ۱',
  3: 'ریاضی - سطح ۲',
  4: 'زیست - سطح ۱',
  5: 'زیست - سطح ۲',
  6: 'شیمی - سطح ۱',
  7: 'شیمی - سطح ۲',
  8: 'فیزیک - سطح ۱',
  9: 'فیزیک - سطح ۲',
  10: 'کامپیوتر - سطح ۱',
  11: 'کامپیوتر - سطح ۲',
  12: 'نجوم - سطح ۱',
  13: 'نجوم - سطح ۲',
}

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100%',
    width: '100%',
    maxWidth: '20rem',
    fontSize: '1rem',
    textDecoration: 'none',
    overflow: 'hidden',
    boxShadow: '0 0 2rem -1.5rem rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.1s ease-in-out',
    maxWidth: '300px',
    '&:hover': {
      transform: 'translateY(-0.2rem) scale(1.02)',
      boxShadow: '0 0.5em 0.5rem -0.5rem rgba(0, 0, 0, 0.5)',
    }
  },
  statImage: {
    height: '40vh',
    background: `url(${process.env.PUBLIC_URL + '/logo.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  title: {
    fontSize: 60,
    color: '#fbebd1',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
    },
  },
  notificationTitle: {
    fontSize: 28,
    color: '#4d4a70',
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'rgb(255, 255, 255, 0.94)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Index = ({
  name,
  score,
  status,
  subject,
}) => {
  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} ${classes.root}`}>
      <Grid container justify='space-evenly' alignItem='space-between' spacing={2}>
        <Grid item container justify='center' alignItems='center' spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h3" className={classes.notificationTitle}>
              {name}
            </Typography>
          </Grid>
          <Grid item container justify='center' xs={4}>
            {status != 3 &&
              <Typography align='center' variant="subtitle" >
                {`وضعیت: ${PROBLEM_STATUS[status]}`}
              </Typography>
            }
            {status == 3 &&
              <Typography align='center' variant="subtitle" >
                {`چوق کسب‌شده: ${toPersianNumber(score)}`}
              </Typography>
            }
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="textSecondary">
            {PROBLEM_SUBJECTS[subject]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='secondary' fullWidth>
            {'مشاهده‌ی سوال'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}


export default Index;
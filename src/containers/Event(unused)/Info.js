import {
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslate } from 'react-redux-multilingual/lib/context';

// import {
// } from '../../redux/slices/events';

import ArticleCard from '../../components/Cards/ArticleCard';
import CreateArticleDialog from '../../components/Dialog/CreateArticleDialog/CreateArticleDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
}));

function Index({
  event,
}) {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{event?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{event?.description}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <Typography align='center'>{event?.is_active ? 'فعال' : 'غیرفعال'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center'>{event?.is_approved ? 'تاییدشده از جانب سایت' : 'تاییدنشده از جانب سایت'}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{'هزینه: ' + event?.merchandise?.price + ' تومان'}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(
  mapStateToProps,
  {
  }
)(Index);

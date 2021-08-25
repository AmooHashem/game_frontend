import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import {
  createAuctionAction,
} from '../../redux/slices/auction';
import {
  addNotificationAction,
} from '../../redux/slices/notifications'

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2),
  }
}));


function Index({
  createAuction,
  addNotification,
  handleClose,

  open,
  problemId,
}) {
  const classes = useStyles()
  const { gameId } = useParams();
  const [price, setPrice] = React.useState();

  const putProblemInAuction = () => {
    if (!price) {
      addNotification({
        message: 'لطفاً قیمت فروش را تعیین کنید!',
        type: 'error',
      });
      return;
    }
    createAuction({ game: gameId, price, problem: problemId })
    handleClose()
  }

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}  >
      <DialogContent>
        <Grid container spacing={1} justify='center'>
          <Grid item>
            <Typography variant='h3' align='center'>قراردادن مسئله در تابلوی مزایده</Typography>
          </Grid>
          <Grid item>
            <img alt='' src='/hammer.png' width='200px' />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1} justify='center'>
          <FormControl>
            <FormLabel>قیمت پیشنهادی</FormLabel>
            <RadioGroup defaultValue={price} row onChange={(e) => setPrice(e.target.value)}>
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="۱ چوق"
                labelPlacement="end"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="۲ چوق"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          <Grid item xs={12} container justify='center'>
            <Button fullWidth variant='contained'
              color='primary' onClick={putProblemInAuction}>
              {'ثبت'}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state, props) => ({
  problemId: props.problemId
})

export default connect(
  mapStateToProps,
  {
    createAuction: createAuctionAction,
    addNotification: addNotificationAction,
  }
)(Index);
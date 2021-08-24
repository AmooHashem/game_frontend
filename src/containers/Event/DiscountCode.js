import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  createDiscountCodeAction,
  deleteDiscountCodeAction,
  getAllMerchandiseDiscountCodesAction,
} from '../../redux/slices/account';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import { toEnglishNumber, toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
}));

function Index({
  addNotification,
  createDiscountCode,
  deleteDiscountCode,
  getAllMerchandiseDiscountCodes,

  event,
  userAccount,
  discountCodes,
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    if (event?.merchandise?.id) {
      getAllMerchandiseDiscountCodes({ merchandiseId: event?.merchandise?.id });
    }
  }, [getAllMerchandiseDiscountCodes, event?.merchandise?.id])

  const handleCreateDiscountCode = () => {
    if (value > 100 || value < 0 || value.toString().includes('.')) {
      addNotification({
        message: 'لطفاً عددی طبیعی بین ۰ تا ۱۰۰ وارد کنید.',
        type: 'error',
      });
      return;
    }
    createDiscountCode({ value: (value / 100), merchandise: event?.merchandise?.id, user: userAccount.id });
  }

  const handleDeleteDiscountCode = (discountCodeId) => {
    deleteDiscountCode({ discountCodeId })
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={6} >
          <TextField
            size='small' fullWidth
            variant='outlined'
            label='درصد تخفیف'
            inputProps={{ className: 'ltr-input' }}
            value={value} onChange={(e) => setValue(toEnglishNumber(e.target.value))} />
        </Grid>
        <Grid item xs={12} sm={6} >
          <Button
            fullWidth variant='contained'
            color='primary'
            onClick={handleCreateDiscountCode}>{'ایجاد'}</Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>شناسه</TableCell>
                  <TableCell align='center'>کد</TableCell>
                  <TableCell align='center'>درصد تخفیف</TableCell>
                  <TableCell align='center'>دفعات باقی‌مانده</TableCell>
                  <TableCell align='center'>تاریخ انقضا</TableCell>
                  <TableCell align='center'>حذف</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discountCodes?.map((discountCode, index) =>
                  <TableRow key={index}>
                    <TableCell align='center'>
                      {toPersianNumber(discountCode?.id)}
                    </TableCell>
                    <TableCell align='center'>
                      {discountCode?.code}
                    </TableCell>
                    <TableCell align='center'>
                      {toPersianNumber(discountCode?.value)}
                    </TableCell>
                    <TableCell align='center'>
                      {toPersianNumber(discountCode?.remaining)}
                    </TableCell>
                    <TableCell align='center'>
                      {discountCode?.expiration_date || 'ندارد'}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton size='small'
                        onClick={() => { handleDeleteDiscountCode(discountCode?.id) }}>
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  userAccount: state.account.userAccount,
  newDiscountCode: state.account.newDiscountCode,
  discountCodes: state.account.discountCodes,
});

export default connect(
  mapStateToProps,
  {
    addNotification: addNotificationAction,
    createDiscountCode: createDiscountCodeAction,
    deleteDiscountCode: deleteDiscountCodeAction,
    getAllMerchandiseDiscountCodes: getAllMerchandiseDiscountCodesAction,
  }
)(Index);

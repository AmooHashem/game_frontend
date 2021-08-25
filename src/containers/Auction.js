import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import {
  buyAuctionAction,
  getAllAuctionsAction,
} from '../redux/slices/auction';
import { toPersianNumber } from '../utils/translateNumber';
import Layout from './Layout';

const DIFFICULTY = {
  'EASY': 'آسان',
  'MEDIUM': 'متوسط',
  'HARD': 'سخت',
}

function Index({
  buyAuction,
  getAllAuctions,

  allAuctions,
}) {
  const { gameId } = useParams();

  useEffect(() => {
    getAllAuctions({ gameId })
  }, [getAllAuctions])

  const buyProblemInAuction = (auctionId) => {
    buyAuction({ gameId, auction: auctionId });
  }

  return (
    <Layout>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography variant="h1" align="center">{'«تابلوی مزایده»'}</Typography>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>شناسه</TableCell>
                  <TableCell align='center'>فروشنده</TableCell>
                  <TableCell align='center'>خریدار</TableCell>
                  <TableCell align='center'>قیمت</TableCell>
                  <TableCell align='center'>مبحث</TableCell>
                  <TableCell align='center'>سطح</TableCell>
                  <TableCell align='center'>خرید</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAuctions?.slice().sort((a, b) => { return a.id > b.id ? -1 : 1 }).map((auction, index) =>
                  <TableRow key={index}>
                    <TableCell align='center'>
                      {toPersianNumber(auction?.id)}
                    </TableCell>
                    <TableCell align='center'>
                      {auction.seller?.name}
                    </TableCell>
                    <TableCell align='center'>
                      {auction.buyer?.name || '-'}
                    </TableCell>
                    <TableCell align='center'>
                      {toPersianNumber(auction.price)}
                    </TableCell>
                    <TableCell align='center'>
                      {auction.problem?.subject?.title}
                    </TableCell>
                    <TableCell align='center'>
                      {DIFFICULTY[auction.problem?.difficulty]}
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip title={
                        auction.buyer
                          ? 'این مسئله فروخته شده است.'
                          : 'خرید مسئله'
                      } arrow>
                        <IconButton
                          onClick={
                            auction.buyer
                              ? () => { }
                              : () => buyProblemInAuction(auction.id)
                          }>
                          <MonetizationOnOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Grid item>
            <Pagination
              count={totalNumberOfPages}
              page={currentPage}
              onChange={handlePaginationChange}
              hidePrevButton hideNextButton
            />
          </Grid> */}
        </Grid>
      </Grid >
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  allAuctions: state.auction.allAuctions,
});

export default connect(
  mapStateToProps,
  {
    buyAuction: buyAuctionAction,
    getAllAuctions: getAllAuctionsAction,
  }
)(Index);

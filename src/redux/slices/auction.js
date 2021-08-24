import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  auctionUrl,
  buyAuctionUrl,
  createAuctionUrl,
} from '../constants/urls';

export const createAuctionAction = createAsyncThunkApi(
  'account/createAuctionAction',
  Apis.POST,
  createAuctionUrl,
);

export const getAllAuctionsAction = createAsyncThunkApi(
  'events/getAllAuctionsAction',
  Apis.GET,
  auctionUrl,
);

export const buyAuctionAction = createAsyncThunkApi(
  'events/buyAuctionAction',
  Apis.POST,
  buyAuctionUrl,
);



const initialState = {
  isFetching: false,
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: {

    // [getPlayerAction.pending.toString()]: isFetching,
    // [getPlayerAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.player = response;
    //   state.isFetching = false;
    // },
    // [getPlayerAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: auctionReducer } = eventSlice;
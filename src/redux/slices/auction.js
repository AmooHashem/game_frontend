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
  {
    defaultNotification: {
      success: 'مسئله‌ی شما با موفقیت در تابلوی مزایده قرار گرفت!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
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
  {
    defaultNotification: {
      success: 'شما مسئله را با موفقیت خریدید. اکنون می‌توانید آن را بین مجموعه مسائل خود مشاهده کنید.',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);



const initialState = {
  isFetching: false,
  allAuctions: [],
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
    [getAllAuctionsAction.pending.toString()]: isFetching,
    [getAllAuctionsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allAuctions = response;
      state.isFetching = false;
    },
    [getAllAuctionsAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: auctionReducer } = eventSlice;
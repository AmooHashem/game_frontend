import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  allRegistrationReceiptsUrl,
  eventInfoUrl,
  oneRegistrationReceiptUrl,
  validateRegistrationReceiptUrl,
} from '../constants/urls';

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getEventInfoAction',
  Apis.GET,
  eventInfoUrl,
);

export const editOneEventInfoAction = createAsyncThunkApi(
  'events/editOneEventInfoAction',
  Apis.PATCH,
  eventInfoUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
  }
);

export const getAllRegistrationReceiptsAction = createAsyncThunkApi(
  'events/getAllRegistrationReceiptsAction',
  Apis.GET,
  allRegistrationReceiptsUrl,
);

export const getOneRegistrationReceiptAction = createAsyncThunkApi(
  'events/getOneRegistrationReceiptAction',
  Apis.GET,
  oneRegistrationReceiptUrl,
);

export const validateRegistrationReceiptAction = createAsyncThunkApi(
  'events/validateRegistrationReceiptAction',
  Apis.POST,
  validateRegistrationReceiptUrl,
  {
    defaultNotification: {
      success: 'وضعیت رسید ثبت‌نام با موفقیت ثبت شد.',
    },
  }
);


const initialState = {
  isFetching: false,
  allRegistrationReceipts: [],
  allEvents: [],
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
    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
    },
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,


    [getAllRegistrationReceiptsAction.pending.toString()]: isFetching,
    [getAllRegistrationReceiptsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allRegistrationReceipts = response;
    },
    [getAllRegistrationReceiptsAction.rejected.toString()]: isNotFetching,


    [getOneRegistrationReceiptAction.pending.toString()]: isFetching,
    [getOneRegistrationReceiptAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationReceipt = response;
    },
    [getOneRegistrationReceiptAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: eventsReducer } = eventSlice;
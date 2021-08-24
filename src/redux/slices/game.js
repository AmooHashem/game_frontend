import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  allRegistrationReceiptsUrl,
  eventInfoUrl,
  playerUrl,
  playerProblemUrl,
  oneRegistrationReceiptUrl,
  subjectUrl,
  validateRegistrationReceiptUrl,
} from '../constants/urls';

export const getPlayerAction = createAsyncThunkApi(
  'account/getProfileInfoAction',
  Apis.GET,
  playerUrl,
);

export const getAllPlayerProblemsAction = createAsyncThunkApi(
  'events/getAllPlayerProblemsAction',
  Apis.GET,
  playerProblemUrl,
);

export const getOnePlayerProblemAction = createAsyncThunkApi(
  'events/getOnePlayerProblemAction',
  Apis.GET,
  playerProblemUrl,
);


export const getAllGameSubjectsAction = createAsyncThunkApi(
  'events/getAllGameSubjectsAction',
  Apis.GET,
  subjectUrl,
);

export const buyRandomProblemAction = createAsyncThunkApi(
  'events/buyRandomProblemAction',
  Apis.POST,
  playerProblemUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت دریافت شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const answerProblemAction = createAsyncThunkApi(
  'events/answerProblemAction',
  Apis.POST_FORM_DATA,
  playerProblemUrl,
  {
    defaultNotification: {
      success: 'پاسخ مسئله با موفقیت ثبت شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);








export const buyRanomProblemAction = createAsyncThunkApi(
  'events/getAllGameSubjectsAction',
  Apis.GET,
  eventInfoUrl,
);

export const sample = createAsyncThunkApi(
  'events/editOneEventInfoAction',
  Apis.PATCH,
  eventInfoUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
    defaultNotification: {
      success: 'وضعیت رسید ثبت‌نام با موفقیت ثبت شد.',
    },
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
  allGameSubjects: [],
  allPlayerProblems: [],
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

    [getPlayerAction.pending.toString()]: isFetching,
    [getPlayerAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.player = response;
      state.isFetching = false;
    },
    [getPlayerAction.rejected.toString()]: isNotFetching,


    [getAllGameSubjectsAction.pending.toString()]: isFetching,
    [getAllGameSubjectsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allGameSubjects = response;
      state.isFetching = false;
    },
    [getAllGameSubjectsAction.rejected.toString()]: isNotFetching,


    [getAllPlayerProblemsAction.pending.toString()]: isFetching,
    [getAllPlayerProblemsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allPlayerProblems = response;
      state.isFetching = false;
    },
    [getAllPlayerProblemsAction.rejected.toString()]: isNotFetching,

    [buyRandomProblemAction.pending.toString()]: isFetching,
    [buyRandomProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      const allPlayerProblems = [...state.allPlayerProblems, response]
      state.allPlayerProblems = allPlayerProblems;
      state.isFetching = false;
    },
    [buyRandomProblemAction.rejected.toString()]: isNotFetching,


    [answerProblemAction.pending.toString()]: isFetching,
    [answerProblemAction.fulfilled.toString()]: isNotFetching,
    [answerProblemAction.rejected.toString()]: isNotFetching,


    [getOnePlayerProblemAction.pending.toString()]: isFetching,
    [getOnePlayerProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.playerProblem = response;
      state.isFetching = false;
    },
    [getOnePlayerProblemAction.rejected.toString()]: isNotFetching,





    // [getOneEventInfoAction.pending.toString()]: isFetching,
    // [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.event = response;
    // },
    // [getOneEventInfoAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: gameReducer } = eventSlice;
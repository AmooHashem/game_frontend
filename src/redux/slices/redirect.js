import { createSlice } from '@reduxjs/toolkit';

const initialState = { redirectTo: null, force: false };
import { answerProblemAction } from './game';

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    initRedirect: () => initialState,
  },
  extraReducers: {
    [answerProblemAction.fulfilled.toString()]: (state, action) => {
      return { redirectTo: `/game/${action?.meta?.arg.gameId}/my_problems` }
    },
    // [createArticleAction.fulfilled.toString()]: (state, { payload: { response } }) => ({
    //   redirectTo: `/edit_article/${response.id}`,
    // }),
  },
});

export const { initRedirect: initRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;

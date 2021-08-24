import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { gameReducer } from './game';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';

const allReducers = combineReducers({
  account: accountReducer,
  notifications: notificationReducer,
  game: gameReducer,
  redirect: redirectReducer,
  Intl: translatorReducer,
});

export default allReducers;

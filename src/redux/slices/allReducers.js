import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { auctionReducer } from './auction';
import { gameReducer } from './game';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';

const allReducers = combineReducers({
  auction: auctionReducer,
  account: accountReducer,
  notifications: notificationReducer,
  game: gameReducer,
  redirect: redirectReducer,
  Intl: translatorReducer,
});

export default allReducers;

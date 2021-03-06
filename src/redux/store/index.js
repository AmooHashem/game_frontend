import { updateToken } from '../../axios';
import createStore from './createStore';

const removeOldJsonData = (delta, data = {}) => {
  for (const key in data) {
    if (Date.now() > data[key].lastUpdate + delta) {
      delete data[key];
    }
  }
};

const persistedState = localStorage.getItem('formula0')
  ? JSON.parse(localStorage.getItem('formula0'))
  : {};

removeOldJsonData(108000000, persistedState?.mentor?.teams);

const reduxStore = createStore(persistedState);

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'formula0',
    JSON.stringify({
      account: {
        userAccount: state.account.userAccount,
        token: state.account.token,
      },
      Intl: state.Intl,
    })
  );
  updateToken({ token: state.account.token });
});

export default reduxStore;

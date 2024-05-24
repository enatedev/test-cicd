import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import FixtureReducer from './reducers/fixtureReducer';
import SearchReducer from './reducers/searchReducer';
import filterReducer from './reducers/filterReducer';
import LoadingReducer from './reducers/loadingReducer';
import OddsDisplayTypeReducer from './reducers/oddsDisplayTypeReducer';
import { i18nReducer } from 'react-redux-i18n';
import BookmakerReducer from './reducers/bookmarkerReducer';
import TeamReducer from './reducers/teamReducer';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['i18n', 'fixtureReducer','bookmakerReducer', 'oddsDisplayTypeReducer']
};

const rootReducer: any = combineReducers({
  // add reducer here
  fixtureReducer: FixtureReducer,
  searchReducer: SearchReducer,
  filterReducer: filterReducer,
  loadingReducer: LoadingReducer,
  oddsDisplayTypeReducer: OddsDisplayTypeReducer,
  bookmakerReducer: BookmakerReducer,
  teamReducer: TeamReducer,
  i18n: i18nReducer
});

export { rootPersistConfig, rootReducer };

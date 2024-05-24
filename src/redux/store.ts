import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import thunk from 'redux-thunk'; 
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducers';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import translations from '../utils/translation';

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).prepend(thunk)
});

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('vi'));

const persistor = persistStore(store);
persistor.purge()

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const  { dispatch } = store;
const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };

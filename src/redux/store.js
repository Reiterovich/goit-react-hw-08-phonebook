import { contactsReducer } from './contact/contact.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './login/login.reducer';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
  // blacklist: ['contacts']
};

export const store = configureStore({
  reducer: {
    contactStore: contactsReducer,
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

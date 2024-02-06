import { contactsReducer } from './contact/contact.reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    contactStore: contactsReducer,
  },
});

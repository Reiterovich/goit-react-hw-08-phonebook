import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://65a701c794c2c5762da62551.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const data = await axios.get('/contacts');
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const data = await axios.post('/contacts/', {
        name: contactData.name,
        phone: contactData.phone,
      });
      Notiflix.Notify.success('Contact add successfully!');
      return data;
    } catch (err) {
      Notiflix.Notify.failure(`Error: ${err.message}`);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (idContact, thunkApi) => {
    try {
      const data = await axios.delete(`/contacts/${idContact}`);
      Notiflix.Notify.success('Contact deleted successfully!');
      return data;
    } catch (err) {
      Notiflix.Notify.failure(`Error: ${err.message}`);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = payload.data;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = payload;
      })
      .addCase(addContact.pending, state => {
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.items = [...state.contacts.items, payload.data];
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.contacts.error = payload;
      })
      .addCase(deleteContact.pending, state => {
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.data.id
        );
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.contacts.error = payload;
      }),
});

// Генератори екшенів
export const { filterContacts } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

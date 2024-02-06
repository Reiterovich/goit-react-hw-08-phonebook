export const selectFilter = state => state.contactStore.filter;
export const selectContacts = state => state.contactStore.contacts.items;
export const selectIsLoading = state => state.contactStore.contacts.isLoading;

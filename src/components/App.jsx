import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  return (
    <>
      <h1>Phonebook</h1>
      <Form />
      <Filter />
      <ContactList />
    </>
  );
};

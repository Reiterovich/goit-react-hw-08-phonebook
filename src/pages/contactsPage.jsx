import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import React from 'react';
import { Form } from 'components/Form/Form';

const ContactsPage = () => {
  return (
    <>
      <Form />
      <Filter />
      <ContactList />
    </>
  );
};

export default ContactsPage;

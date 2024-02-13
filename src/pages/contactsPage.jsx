import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import React from 'react';
import { Form } from 'components/Form/Form';
import { ContainerContacts } from './contactsPage.stayled.components';

const ContactsPage = () => {
  return (
    <>
      <Form />
      <ContainerContacts>
        <Filter />
        <ContactList />
      </ContainerContacts>
    </>
  );
};

export default ContactsPage;

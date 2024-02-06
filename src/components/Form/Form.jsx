import Notiflix from 'notiflix';
import { useState } from 'react';
import { addContact } from '../../redux/contact/contact.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contact/selector';

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const hendleSubmit = evt => {
    evt.preventDefault();

    const contactData = {
      name: name,
      phone: number,
    };

    if (
      contacts.some(
        elm =>
          elm.name.toLowerCase() === contactData.name.toLowerCase() ||
          elm.phone === contactData.phone
      )
    ) {
      Notiflix.Notify.failure(
        `${contactData.name} or ${contactData.phone} is already in contacts!`
      );

      return;
    }

    dispatch(addContact(contactData));

    setName('');
    setNumber('');
  };

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name': {
        setName(value);
        return;
      }
      case 'number': {
        setNumber(value);
        return;
      }
      default:
        return;
    }
  };

  return (
    <>
      <form onSubmit={hendleSubmit}>
        <h2>Name</h2>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={name}
          required
        />
        <br />
        <h2>Number</h2>
        <input
          onChange={handleInputChange}
          type="tel"
          name="number"
          value={number}
          required
        />
        <br />
        <button type="submit">Add contact</button>
      </form>
      <br />
      <h2>Contacts</h2>
    </>
  );
};

import Notiflix from 'notiflix';
import { useState } from 'react';
import { addContact } from '../../redux/contact/contact.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contact/selector';
import { ButtonAdd, ContainerAddContact } from './Form.styled.components';

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const hendleSubmit = evt => {
    evt.preventDefault();

    const contactData = {
      name: name,
      number: number,
    };

    if (
      contacts.some(
        elm =>
          elm.name.toLowerCase() === contactData.name.toLowerCase() ||
          elm.number === contactData.number
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
    <ContainerAddContact>
      <form onSubmit={hendleSubmit}>
        <h2>Add contact</h2>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={name}
          required
        />
        <br />
        <h3>Number</h3>
        <input
          onChange={handleInputChange}
          type="tel"
          name="number"
          value={number}
          required
        />
        <br />
        <ButtonAdd type="submit">Add contact</ButtonAdd>
      </form>
      <br />
    </ContainerAddContact>
  );
};

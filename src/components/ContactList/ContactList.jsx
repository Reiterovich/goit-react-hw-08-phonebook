import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
} from '../../redux/contact/contact.reducer';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
} from '../../redux/contact/selector';
import { useEffect } from 'react';
import {
  ContactButton,
  ContactConteiner,
  LiContact,
  ListUlContact,
} from './ContactList.styled.components';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterApp = () => {
    return contacts.filter(fil =>
      fil.name.toLowerCase().includes(filter.toLowerCase())
    );
    // return 'andrii';
  };

  const data = filterApp();

  const deleteItem = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ContactConteiner>
      <ListUlContact>
        {isLoading && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {data.map(con => (
          <LiContact key={con.id}>
            {con.name}: {con.number}
            <ContactButton onClick={evt => deleteItem(con.id)} type="button">
              delete
            </ContactButton>
          </LiContact>
        ))}
      </ListUlContact>
    </ContactConteiner>
  );
};

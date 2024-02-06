import { useDispatch } from 'react-redux';
import { filterContacts } from '../../redux/contact/contact.reducer';

export const Filter = () => {
  const dispatch = useDispatch();

  const filterName = filter => {
    dispatch(filterContacts(filter));
  };

  const handleInputChange = evt => {
    const value = evt.target.value;

    filterName(value);
  };

  return (
    <>
      <p>Find contacts by neme</p>
      <input name="filter" type="text" onChange={handleInputChange} />
    </>
  );
};

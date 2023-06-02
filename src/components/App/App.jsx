import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { Form } from 'components/Form/Form';
import { useEffect, useState } from 'react';
import { Div } from './App.styled';

const initialPhoneBook = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem(key));
    return contacts.length === 0 ? defaultValue : contacts;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialPhoneBook);
  const [filter, setFilter] = useState('');

  const deleteContacts = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };
  const addContacts = data => {
    contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(data.name + 'is already in contacts')
      : setContacts(prev => [...prev, data]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Div>
      <h1>Phonebook</h1>
      <Form addContacts={addContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <Contacts
        contacts={getVisibleContacts()}
        deleteContact={deleteContacts}
      />
    </Div>
  );
}

import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { Form } from 'components/Form/Form';
import { useEffect, useState } from 'react';
import { Div } from './App.styled';
import { initialPhoneBook } from 'components/data/data';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialPhoneBook);
  const [filter, setFilter] = useState('');

  function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
      const contacts = JSON.parse(localStorage.getItem(key));
      if (contacts) {
        return contacts.length === 0 ? defaultValue : contacts;
      } else {
        return defaultValue;
      }
    });
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }
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

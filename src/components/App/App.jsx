import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { Form } from 'components/Form/Forrm';
import { Component } from 'react';
import { Div } from './App.styled';

const initialPhoneBook = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: initialPhoneBook,
    filter: '',
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  addContacts = data => {
    this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(data.name + 'is already in contacts')
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, data],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const parse = JSON.parse(localStorage.getItem('contacts'));
    if (parse && parse.length > 0) {
      this.setState({
        contacts: parse,
      });
    } else {
      this.setState({
        users: initialPhoneBook,
      });
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Div>
        <h1>Phonebook</h1>
        <Form addContacts={this.addContacts} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} changeFilter={this.changeFilter} />
        <Contacts
          contacts={visibleContacts}
          deleteContact={this.deleteContacts}
        />
      </Div>
    );
  }
}

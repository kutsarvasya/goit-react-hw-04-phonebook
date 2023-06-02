import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { BtnSubmit, FormContacts, LabelForm } from './Form.styled';
import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const cont = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    this.props.addContacts(cont);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <FormContacts onSubmit={this.handleSubmit}>
        <LabelForm>
          Name
          <input
            onChange={this.handleInput}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </LabelForm>

        <LabelForm>
          Number
          <input
            onChange={this.handleInput}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </LabelForm>
        <BtnSubmit type="submit">add contacts</BtnSubmit>
      </FormContacts>
    );
  }
}
Form.propTypes = {
  addContacts: PropTypes.func.isRequired,
};

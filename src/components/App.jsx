import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box.styled';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { PhonebookBox, ContactBox } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (
      !contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      setContacts(prevContacts => [...prevContacts, contact]);
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  const findContact = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <Box>
      <GlobalStyle />
      <PhonebookBox>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </PhonebookBox>
      <ContactBox>
        <h2>Contacts</h2>
        {contacts.length !== 0 && (
          <Filter value={filter} onChange={findContact} />
        )}
        <ContactList
          contacts={filterContacts()}
          deleteContact={deleteContact}
        />
      </ContactBox>
    </Box>
  );
}

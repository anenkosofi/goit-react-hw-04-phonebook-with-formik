import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Field, Label, Input, Button } from './ContactForm.styled';

export function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', number: '' });

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      ...form,
    };

    onSubmit(newContact);

    setForm({ name: '', number: '' });
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Field>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder=" "
          required
          onChange={handleChange}
          value={form.name}
        />
        <Label>Name</Label>
      </Field>
      <Field>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder=" "
          required
          onChange={handleChange}
          value={form.number}
        />
        <Label>Number</Label>
      </Field>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import getUser from '../../utilities/getUser';
import saveUser from '../../utilities/saveUser';
import validate from '../../utilities/validate';
import Button from '../Button';
import TextInput from '../TextInput';

let userCopy;

class User {
  constructor(user = {}, validate) {
    this.name = validate ? user.name : user.name || '';
    this.email = validate ? user.email : user.email || '';
    this.phone = validate ? user.phone : user.phone || '';

    if (user.id) {
      this.id = user.id;
    }
  }
}

function UserForm ({ editUser, sharedState, switchPanel }) {
  const [user, setUser] = useState(new User());
  const [validationResults, setValidationResults] = useState(new User({}, true));
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    if (editUser.id) {
      getUser(editUser.id).then((data) => {
        userCopy = JSON.parse(JSON.stringify(data)); // make a copy to compare later
        setUser(new User(data))
      });
    } else {
      setUser(new User());
    }
  }, [editUser]);

  return (
    <form
      className={`${prefix}-user-form`}
      onSubmit={e => saveForm(e)}>
      <TextInput
        className={`${prefix}-user-form__input`}
        id="name"
        name="name"
        label="Name"
        validate={getValidation(validationResults.name)}
        onChange={e => {
          trackValidation(e);
          trackUserChanges(e);
        }}
        value={user.name || ''} />
      <TextInput
        className={`${prefix}-user-form__input`}
        id="email"
        name="email"
        label="Email"
        validate={getValidation(validationResults.email)}
        onChange={e => {
          trackValidation(e);
          trackUserChanges(e);
        }}
        value={user.email || ''} />
      <TextInput
        className={`${prefix}-user-form__input`}
        id="phone"
        name="phone"
        label="Phone"
        validate={getValidation(validationResults.phone)}
        onChange={e => {
          trackValidation(e);
          trackUserChanges(e);
          e.target.value = displayPhone(e.target.value);
        }}
        value={displayPhone(user.phone) || ''} />
      <input
        className={`${prefix}-user-form__input`}
        id="id"
        name="id"
        value={user.id || ''}
        type="hidden" />
      <div className={`${prefix}-user-form__actions`}>
        <Button
          size="lg"
          styleType="primary"
          type="submit"
          disabled={disabledSubmit}>Save</Button>
        <Button
          size="lg"
          styleType="secondary"
          onClick={clearForm}>Cancel</Button>
      </div>
    </form>
  );

  function trackUserChanges (e) {
    user[e.target.id] = e.target.id === 'phone' ? cleanPhone(e.target.value) : e.target.value.trim();
    setUser(new User(user));
    enableSaveButton(user, userCopy);
  }

  function trackValidation (e) {
    validationResults[e.target.id] = validate[e.target.id](e.target.value.trim());
    setValidationResults(new User(validationResults, true));
  }

  function clearForm (e) {
    switchPanel(e);
    setUser(new User());
    setDisabledSubmit(true);

    Object.keys(validationResults).forEach(key => {
      validationResults[key] = '';
    });

    setValidationResults(new User(validationResults, true))
  }

  function enableSaveButton (user, userCopy) {
    if (userHasChanged(user, userCopy) && validateEverything(user)) {
      setDisabledSubmit(false); // ready to submit
    } else {
      setDisabledSubmit(true); // not ready to submit
    }
  }

  function validateEverything (user) {
    const keys = Object.keys(user);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key !== 'id' && !validate[key](user[key])) {
        return false; // something went wrong
      }
    }

    return true; // everything checks out
  }

  function userHasChanged (user, userCopy = {}) {
    const keys = Object.keys(user);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key !== 'id'
        && user[key] !== userCopy[key]) {
        return true; // something is different!
      }
    }
  }

  function saveForm (e) {
    e.preventDefault();

    saveUser(user).then((savedUser) => {
      clearForm(e);
      sharedState.saveUser(savedUser, editUser.index);
    });
  }

  function cleanPhone (str) {
    return str.replace(/\D/g, '');
  }

  function displayPhone (str = '') {
    let formattedPhone;
    str = cleanPhone(str);

    if (str.length <= 7) {
      formattedPhone = [str.slice(0,3), str.slice(3, str.length)];
    } else {
      formattedPhone = [str.slice(0,3), str.slice(3,6), str.slice(6, str.length)];
    }

    return formattedPhone.filter(d => d.length).join('-');
  }

  function getValidation (result) {
    if (result === false) {
      return 'error';
    } else if (result === true) {
      return 'valid';
    }

    return '';
  }
}

export default UserForm;

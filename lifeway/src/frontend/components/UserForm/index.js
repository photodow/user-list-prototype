import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import getUser from '../../utilities/getUser';
import saveUser from '../../utilities/saveUser';
import Button from '../Button';
import TextInput from '../TextInput';

class User {
  constructor(user = {}) {
    this.name = user.name || '';
    this.email = user.email || '';
    this.phone = user.phone || '';

    if (user.id) {
      this.id = user.id;
    }
  }
}

function UserForm ({ editUser, sharedState, switchPanel }) {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    if (editUser.id) {
      getUser(editUser.id).then(d => setUser(new User(d)));
    } else {
      setUser(new User());
    }
  }, [editUser]);

  return (
    <form className={`${prefix}-user-form`} onSubmit={e => saveForm(e)}>
      <TextInput
        className={`${prefix}-user-form__input`}
        id="name"
        label="Name"
        onChange={e => trackUserChanges(e, 'name')}
        value={user.name || ''} />
      <TextInput
        className={`${prefix}-user-form__input`}
        id="email"
        label="Email"
        onChange={e => trackUserChanges(e, 'email')}
        value={user.email || ''} />
      <TextInput
        className={`${prefix}-user-form__input`}
        id="phone"
        label="Phone"
        onChange={e => trackUserChanges(e, 'phone')}
        value={user.phone || ''} />
      <TextInput
        className={`${prefix}-user-form__input`}
        id="id"
        onChange={e => trackUserChanges(e, '')}
        value={user.id || ''}
        type="hidden" />
      <div className={`${prefix}-user-form__actions`}>
        <Button size="lg" styleType="primary" type="submit">Save</Button>
        <Button size="lg" styleType="secondary" onClick={clearForm}>Cancel</Button>
      </div>
    </form>
  );

  function trackUserChanges (e, prop) {
    user[prop] = e.target.value;
    setUser(new User(user));
  }

  function clearForm (e) {
    switchPanel(e);
    setUser(new User());
  }

  function saveForm (e) {
    e.preventDefault();
    saveUser(user).then((savedUser) => {
      switchPanel(e);
      sharedState.saveUser(savedUser, editUser.index);
    });
  }

  function formatPhone () {

  }
}

export default UserForm;

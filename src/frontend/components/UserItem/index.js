import { useState } from 'react';
import deleteUser from '../../utilities/deleteUser';
import { prefix } from '../../globals';
import classnames from 'classnames';
import Button from '../Button';
import {ReactComponent as ReactEdit} from '@carbon/icons/svg/32/edit.svg';
import {ReactComponent as ReactTrash} from '@carbon/icons/svg/32/trash-can.svg';

function User ({ switchPanel, index, id, name, email, phone, deleteUserFromState }) {
  const [status, setStatus] = useState('');

  return (
    <li className={classnames(`${prefix}-user-item`, status)}>
      <div className={`${prefix}-user-item__brief`}>
        <p className={`${prefix}-user-item__primary`}>{name}</p>
        <p className={`${prefix}-user-item__secondary`}>{email || 'n/a'}</p>
      </div>
      <aside className={`${prefix}-user-item__actions`}>
        <Button data-userid={id} data-userindex={index} styleType="secondary" onClick={switchPanel}>
          <ReactEdit />
        </Button>
        <Button
          styleType="danger"
          onClick={e => deleteItem(id, e)}
        >
          <ReactTrash />
        </Button>
      </aside>
    </li>
  );

  function deleteItem (id, e) {
    e.preventDefault();
    deleteUser(id).then(() => {
      setStatus(`${prefix}-user-item--deleted`);

      setTimeout(() => {
        deleteUserFromState();
      }, 300);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}

export default User;

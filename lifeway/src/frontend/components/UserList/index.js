import { useEffect, useState } from 'react';
import getUsers from '../../utilities/getUsers';
import { prefix } from '../../globals';
import Button from '../Button';
import UserItem from '../UserItem';
import {ReactComponent as ReactAdd} from '@carbon/icons/svg/32/add.svg';

function UserList ({ switchPanel }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(d => setUsers(d));
  }, []);

  return (
    <article className={`${prefix}-user-list__container`}>
      <header className={`${prefix}-user-list__header`}>
        <Button
          type="primary"
          className={`${prefix}-user-list__new`}
          onClick={switchPanel}
        >
          New <ReactAdd />
        </Button>
        <p className={`${prefix}-user-list__label`}>Name</p>
        <p className={`${prefix}-user-list__label`}>Actions</p>
      </header>
      <ul className={`${prefix}-user-list`}>
        {users.map((user, i) =>
            <UserItem
              switchPanel={switchPanel}
              key={i}
              deleteUserFromState={() => deleteUserFromState(i)}
              {...user}
            />
          )}
      </ul>
    </article>
  );

  function deleteUserFromState (index) {
    users.splice(index, 1);
    setUsers([...users]);
  }
}

export default UserList;

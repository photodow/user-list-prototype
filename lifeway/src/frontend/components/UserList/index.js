import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import Button from '../Button';
import UserItem from '../UserItem';
import {ReactComponent as ReactAdd} from '@carbon/icons/svg/32/add.svg';

function UserList ({ users, sharedState, switchPanel }) {
  return (
    <article className={`${prefix}-user-list__container`}>
      <header className={`${prefix}-user-list__header`}>
        <Button
          size="lg"
          styleType="primary"
          className={`${prefix}-user-list__new`}
          onClick={switchPanel}
        >
          New <ReactAdd />
        </Button>
        <p className={`${prefix}-user-list__label`}>Name</p>
        <p className={`${prefix}-user-list__label`}>Actions</p>
      </header>
      <ul className={`${prefix}-user-list`}>
        {users.sort(sortUsers).map((user, i) =>
            <UserItem
              switchPanel={switchPanel}
              key={user.id}
              index={i}
              deleteUserFromState={() => sharedState.deleteUser(i)}
              {...user}
            />
          )}
      </ul>
    </article>
  );

  function sortUsers (a, b) {
    const aa = a.name.toUpperCase();
    const bb = b.name.toUpperCase();

    if (aa < bb) {
      return -1;
    }
    if (aa > bb) {
      return 1;
    }

    return 0;
  }
}

export default UserList;

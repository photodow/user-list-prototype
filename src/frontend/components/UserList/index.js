import { prefix } from '../../globals';
import Button from '../Button';
import UserItem from '../UserItem';
import {ReactComponent as ReactAdd} from '@carbon/icons/svg/32/add.svg';
import {ReactComponent as ReactFish} from '@carbon/icons/svg/32/fish--multiple.svg';

function UserList ({ users, sharedState, switchPanel }) {
  return !users.length ? empty() : (
    <article className={`${prefix}-user-list__container`}>
      <header className={`${prefix}-user-list__header`}>
        {addButton()}
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

  function addButton () {
    return (
      <Button
        size="lg"
        styleType="primary"
        className={`${prefix}-user-list__new`}
        onClick={switchPanel}
      >
        New <ReactAdd />
      </Button>
    );
  }

  function empty () {
    return (
      <div className={`${prefix}-user-list__empty`}>
        <ReactFish className={`${prefix}-user-list__empty-icon`} />
        <p>Your user list is empty right now. Start adding users to see them multiply.</p>
        <p>{addButton()}</p>
      </div>
    );
  }
}

export default UserList;

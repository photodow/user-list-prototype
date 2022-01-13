import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import getUser from '../../utilities/getUser';
import Button from '../Button';

function EditForm ({ userId, switchPanel }) {
  const [user, setUser] = useState({});

  // SUCCESS MESSAGE?

  useEffect(() => {
    if (userId) {
      getUser(userId).then(d => setUser(d));
    } else {
      setUser({});
    }
  }, [userId]);

  return (
    <form className={`${prefix}-edit-form`}>
      <Button type="primary">Submit</Button>
      <Button type="secondary" onClick={switchPanel}>Cancel</Button>
      {JSON.stringify(user)}
    </form>
  );
}

export default EditForm;

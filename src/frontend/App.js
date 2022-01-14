import { useEffect, useState } from 'react';
import { prefix } from './globals';
import classnames from 'classnames';
import getUsers from './utilities/getUsers';
import Popup from './components/Popup';
import UserList from './components/UserList';
import PanelSwitcher from './components/PanelSwitcher';
import Header from './components/Header';
import UserForm from './components/UserForm';

function App() {
  const [autoOpen, setAutoOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAutoOpen(true);
    }, 1500)
  }, []);

  useEffect(() => {
    getUsers().then(d => setUsers(d));
  }, []);


  const sharedState = {
    saveUser: (user, index) => {
      if (index) {
        users.splice(index, 1, user);
      } else {
        users.push(user);
      }
      setUsers([...users]);
    },
    deleteUser: (index) => {
      users.splice(index, 1);
      setUsers([...users]);
    }
  }

  return (
    <main className="lw-main">
      <Popup open={autoOpen}>
        <PanelSwitcher
          aside={
            <>
              <Header title={editUser.id ? 'Edit user' : 'Create user'} active={autoOpen} />
              <UserForm
                editUser={editUser}
                sharedState={sharedState}
                switchPanel={e => switchPanel('left', e)}
              />
            </>
          }
          activePanel={panel}>
          <Header title="User list" active={autoOpen} />
          <UserList
            users={users}
            sharedState={sharedState}
            switchPanel={e => switchPanel('right', e)}
          />
        </PanelSwitcher>
      </Popup>
    </main>
  );

  function switchPanel (panelName, e) {
    e.preventDefault();
    setPanel(panelName);
    setEditUser({
      id: e.target.dataset.userid,
      index: e.target.dataset.userindex
    });
    return panel;
  }
}




export default App;

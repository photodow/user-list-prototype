import { useEffect, useState } from 'react';
import { prefix } from './globals';
import classnames from 'classnames';
import Popup from './components/Popup';
import UserList from './components/UserList';
import PanelSwitcher from './components/PanelSwitcher';
import Header from './components/Header';
import UserForm from './components/UserForm';

function App() {
  const [autoOpen, setAutoOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [activeUserId, setActiveUserId] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setAutoOpen(true);
    }, 1500)
  }, []);

  return (
    <main className="lw-main">
      <Popup open={autoOpen}>
        <PanelSwitcher
          aside={
            <UserForm userId={activeUserId}
              switchPanel={e => switchPanel('left', e)} />
          }
          activePanel={panel}>
          <Header title="User list" active={autoOpen} />
          <UserList
            switchPanel={e => switchPanel('right', e)}
          />
        </PanelSwitcher>
      </Popup>
    </main>
  );

  function switchPanel (panelName, e) {
    e.preventDefault();
    setPanel(panelName);
    setActiveUserId(e.target.id);
  }
}




export default App;

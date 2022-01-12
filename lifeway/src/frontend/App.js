import { useEffect, useState } from 'react';
import logo from './img/logo.svg';
import './App.scss';
import getUsers from './utilities/getUsers.js';

function App() {

  const [users, setUsers] = useState([])

  useEffect(async () => {
    setUsers(await getUsers());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {users.map(user => user.name + ' ')}
        </a>
      </header>
    </div>
  );
}

export default App;

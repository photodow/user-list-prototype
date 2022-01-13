import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import classnames from 'classnames';

function Header ({ title, active = true }) {
  const [activeState, setActiveState] = useState('');

  useEffect(() => {
    if (active) {
      setActiveState(`${prefix}-header--active`);
    } else {
      setActiveState('');
    }
  }, [active]);

  return (
    <header className={classnames(`${prefix}-header`, activeState)}>
      <h1 className={classnames(
          `${prefix}-header__title`,
          `${prefix}-main-heading`)}>
        {title}
      </h1>
    </header>
  );
}

export default Header;

import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { prefix } from '../../globals';

function Popup ({ children, open }) {

  const [openState, setOpenState] = useState('');

  useEffect(() => {
    if (open) {
      setOpenState(`${prefix}-popup--open`);
    } else {
      setOpenState('');
    }
  }, [open]);

  return (
    <div className={classnames(`${prefix}-popup__container`, openState)}>
      <article className={`${prefix}-popup`}>
        {children}
      </article>
    </div>
  );
}

export default Popup;

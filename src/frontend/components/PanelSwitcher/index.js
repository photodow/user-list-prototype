import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import classnames from 'classnames';

const focusElementsSelector = 'input, button, a';
let keysDown = {};

function PanelSwitcher ({ children, aside, activePanel = 'left' }) {

  useEffect(() => focusTopPanel(activePanel), [activePanel]);

  return (
    <div className={classnames(`${prefix}-panel-switcher`, `${prefix}-panel-switcher--${activePanel}`)} onKeyDown={trapFocus} onKeyUp={clearKeyDown}>
      <div className={`${prefix}-panel-switcher__panel`}>
        {children}
      </div>
      <div className={`${prefix}-panel-switcher__panel`}>
        {aside}
      </div>
    </div>
  );
}

function focusTopPanel (activePanel) {
  let activeIndex = activePanel === 'right' ? 1 : 0;
  const panels = document.querySelectorAll(`.${prefix}-panel-switcher__panel`);
  const first = panels[activeIndex].querySelector(focusElementsSelector);

  setTimeout(() => {
    first.focus();
  }, 300);
}

function clearKeyDown (e) {
  delete keysDown[e.key];
}

function trapFocus (e) {
  const isTabPressed = e.key === 'Tab';
  const isShiftPressed = e.key === 'Shift';
  const current = e.target;
  let scope = e.target;

  if (isShiftPressed || isTabPressed) {
    keysDown[e.key] = true;
  }

  if (!isTabPressed) {
    return;
  }

  while (!scope.classList.contains(`${prefix}-panel-switcher__panel`)) {
    scope = scope.parentNode;
  }

  const focusable = scope.querySelectorAll(focusElementsSelector);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (current === last && !keysDown['Shift']) {
    e.preventDefault();
    first.focus();
  } else if (current === first && keysDown['Shift']) {
    e.preventDefault();
    last.focus();
  }
}

export default PanelSwitcher;

import { prefix } from '../../globals';
import classnames from 'classnames';

function PanelSwitcher ({ children, aside, activePanel = 'left' }) {

  return (
    <div className={classnames(`${prefix}-panel-switcher`, `${prefix}-panel-switcher--${activePanel}`)}>
      <div className={`${prefix}-panel-switcher__panel`}>
        {children}
      </div>
      <div className={`${prefix}-panel-switcher__panel`}>
        {aside}
      </div>
    </div>
  );
}

export default PanelSwitcher;

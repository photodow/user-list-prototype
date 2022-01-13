import { prefix } from '../../globals';
import classnames from 'classnames';

function Button ({ type, href, className, children, ...props }) {

  const Comp = href ? 'a' : 'button';

  return (
    <Comp href={href} className={classnames(className, `${prefix}-btn`, `${prefix}-btn--${type}`)} {...props}>
      {children}
    </Comp>
  );
}

export default Button;

import { prefix } from '../../globals';
import classnames from 'classnames';

function Button ({ size, href, className, children, styleType = 'secondary', ...props }) {

  const Comp = href ? 'a' : 'button';

  return (
    <Comp href={href} className={classnames(className, `${prefix}-btn`, `${prefix}-btn--${styleType}`, `${prefix}-btn--${size}`)} {...props}>
      {children}
    </Comp>
  );
}

export default Button;

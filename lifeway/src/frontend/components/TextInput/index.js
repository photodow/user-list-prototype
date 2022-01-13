import { prefix } from '../../globals';

function TextInput (props) {
  return (
    <input className={`${prefix}-text-input`} type="text" {...props} />
  );
}

export default TextInput;

import { useEffect, useState } from 'react';
import { prefix } from '../../globals';
import classnames from 'classnames';

function TextInput ({id, label, className, onChange, value = '', ...props}) {

  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <div className={classnames(`${prefix}-text-input__group`, className)}>
      {label && <label htmlFor={id}
        className={`${prefix}-text-input__label`}>
        {label}
      </label>}
      <input
        type="text"
        id={id}
        value={valueState}
        onChange={e => {
          handleChange(e);
          if (typeof onChange === 'function') {
            onChange(e);
          }
        }}
        className={classnames(`${prefix}-text-input`, classnames)} {...props}
      />
    </div>
  );

  function handleChange (e) {
    setValueState(e.target.value);
  }
}

export default TextInput;

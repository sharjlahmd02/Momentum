import { useState } from 'react';

import {
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
}) {

  const [showPassword,
    setShowPassword] =
      useState(false);

  const isPassword =
    type === 'password';

  return (

    <div className='relative'>

      <input
        type={
          isPassword
            ? (
              showPassword
                ? 'text'
                : 'password'
            )
            : type
        }

        name={name}

        placeholder={placeholder}

        value={value}

        onChange={onChange}

        className='w-full px-4 py-3 rounded-xl border outline-none pr-12'

        style={{
          background:
            'var(--bg-primary)',

          borderColor:
            'var(--border-color)',

          color:
            'var(--text-primary)',
        }}
      />

      {isPassword && (

        <button
          type='button'

          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }

          className='absolute right-4 top-1/2 -translate-y-1/2'
        >

          {showPassword
            ? <FiEyeOff />
            : <FiEye />}

        </button>

      )}

    </div>
  );
}

export default Input;
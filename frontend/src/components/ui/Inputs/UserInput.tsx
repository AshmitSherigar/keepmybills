import { forwardRef, type InputHTMLAttributes } from 'react';

type UserInputProps = InputHTMLAttributes<HTMLInputElement>;

const UserInput = forwardRef<HTMLInputElement, UserInputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="bg-white py-3 px-2 border border-gray-400 rounded-md focus:outline-blue-600"
      {...props}
    />
  );
});

export default UserInput;

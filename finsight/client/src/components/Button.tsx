// In finsight/client/src/components/Button.tsx
import React from 'react';
import { Spinner } from './Spinner';

type ButtonProps = React.ComponentProps<'button'> & {
  isLoading?: boolean;
};

export const Button = ({ children, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full px-4 py-2 font-bold text-white bg-sky-600 rounded-md hover:bg-sky-700 disabled:bg-sky-800 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

// In finsight/client/src/components/Input.tsx
import React from 'react';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  icon?: React.ReactNode;
};

export const Input = ({ label, id, icon, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          {...props}
        />
      </div>
    </div>
  );
};

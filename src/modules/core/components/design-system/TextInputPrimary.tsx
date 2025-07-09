
import React, { ChangeEvent } from 'react'

type Props = {
    // Define any props you need for the TextInputPrimary component
    placeholder?: string;
    value?: string;
    onChange: (e :ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    onSubmit: () => void;
}

export default function TextInputPrimary({onChange,placeholder,value,disabled,onSubmit}: Props) {
  return (
    <input
      onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
      }}
      type="text"
      className="
            bg-transparent
            focus:outline-none
            border-transparent
            forcus:border-transparent
            focus:ring-0
            text-sm
            text-gray-600"
      placeholder="Enter text here"
      // Add any additional props or event handlers as needed
      value={value}
      onChange={onChange}
      disabled={disabled}
    
    />
  )
}

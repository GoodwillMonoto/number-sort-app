import React from 'react'

type Props = {
    displayValue?: string;
    maxRow : number; // Optional: maximum number of rows to display
}

export default function TextAreaPrimary({displayValue,maxRow: maxrow}: Props) {
  return (
    <textarea
      value={displayValue}
      readOnly // Optional: prevents direct editing in the textarea
      rows={maxrow} // Adjust rows dynamically
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
      
    />
  )
}

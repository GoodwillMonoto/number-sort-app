import React, { useState } from 'react';

const NumberSort: React.FC = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
    const [isAscending, setIsAscending] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setError('');
    };

    const validateAndSortNumbers = () => {
        const values = input.split(',').map((val) => val.trim());
        const numbers = values.map((val) => parseFloat(val));

        if (values.some((val, index) => isNaN(numbers[index]))) {
            setError('Input contains non-numeric values. Please enter only numbers.');
            setSortedNumbers([]);
            return;
        }

        const sorted = [...numbers].sort((a, b) => a - b);
        setSortedNumbers(sorted);
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    return (
        <div>
            <h1 className=" text-red-800">Number Sorter</h1>
            <div>
                <label htmlFor="numberInput">Enter numbers (comma-separated): </label>
                <input
                    id="numberInput"
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                />
                <button onClick={validateAndSortNumbers}>Sort</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {sortedNumbers.length > 0 && (
                <div>
                    <button onClick={toggleSortOrder}>
                        Toggle to {isAscending ? 'Descending' : 'Ascending'}
                    </button>
                    <h2>Sorted Numbers ({isAscending ? 'Ascending' : 'Descending'}):</h2>
                    <p>
                        {isAscending
                            ? sortedNumbers.join(', ')
                            : [...sortedNumbers].reverse().join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default NumberSort;
import React, { ChangeEvent, useEffect } from 'react'
import { useTransactionListSorter } from '../hooks/useTransactionListSorter'
import TextInputPrimary from '../../core/components/design-system/TextInputPrimary';
import ButtonPrimary from '../../core/components/design-system/ButtonPrimary';
import ButtonToggle from '../../core/components/design-system/ButtonToggle';

export default function TransactionListSorter() {
    const sortList = useTransactionListSorter(state => state.sortList);
    const toggleSortOrder = useTransactionListSorter(state => state.toggleSortOrder);
    const isValidList = useTransactionListSorter(state => state.isValidList);
    const setIputList = useTransactionListSorter(state => state.setListInput);
    const createList = useTransactionListSorter(state => state.createList);
    const listInput = useTransactionListSorter(state => state.listInput);
    const isAscending = useTransactionListSorter(state => state.isAscending);
    const sortedList = useTransactionListSorter(state => state.sortedList);
    const [value, setValue] = React.useState(listInput);

    function handleListInputChange(e :ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);   
    }
    function handleSortSubmit() {
        let isValid = isValidList();

        if (!isValid) {
            alert('Please enter a valid list of numbers.');
            return;
        }

        if(listInput === value){
            return; // No change in input, do nothing
        }

        // If the input is valid, set the input list and sort it
        setIputList(value);
        sortList();
    }

    function handleToggleSortOrder() {

        let isValid = isValidList();
        if (!isValid) {
            alert('Please enter a valid list of numbers.');
            return;
        }

        if (listInput === value)
        {
            toggleSortOrder();
            sortList();
        }
        else {
            setIputList(value);
            toggleSortOrder();
            sortList();
        }
    }

  return (
    <>
    <div className="flex  flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md max-w-[50%] mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Transaction List Sorter</h1>

        <div className="flex grow w-[100%] justify-between
         bg-white p-5 items-center
         text-gray-700 shadow-m">

            <h2 className="flex w-[25%] text-lg font-semibold">Enter Numbers to Sort:</h2>
        
            <div className="flex w-[65%]  items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
                <TextInputPrimary
                    placeholder="Enter numbers here"
                    onChange={handleListInputChange}
                    value={value}
                    disabled={false}
                    onSubmit={handleSortSubmit}
                />
                <ButtonPrimary
                    text="Sort"
                    onClick={handleSortSubmit}
                    disabled={false}
                />

            </div>
            <div className='flex w-[10%] items-center justify-end space-x-2'>
                <ButtonToggle
                    toggleText={['Ascending', 'Descending']}
                    isOn={isAscending}
                    onClick={handleToggleSortOrder}
                    disabled={value.length === 0}
                />
            </div>
            

        </div>
            {sortedList}
    </div>
    </>
  )
}

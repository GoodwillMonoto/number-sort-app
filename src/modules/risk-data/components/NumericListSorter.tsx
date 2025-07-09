import React, { ChangeEvent,  useEffect } from 'react'
import {  useNumericListSorter } from '../hooks/useNumericListSorter'
import TextInputPrimary from '../../core/components/design-system/TextInputPrimary';
import ButtonPrimary from '../../core/components/design-system/ButtonPrimary';
import ButtonToggle from '../../core/components/design-system/ButtonToggle';
import TextAreaPrimary from '../../core/components/design-system/TextAreaPrimary';
import { useShallow } from 'zustand/shallow';

export default function NumericListSorter() {
    const sortList = useNumericListSorter(state => state.sortList);
    const toggleSortOrder = useNumericListSorter(state => state.toggleSortOrder);
    const createList = useNumericListSorter(state => state.createList);
    const setInput = useNumericListSorter(state => state.setInput);
    const setIsValid = useNumericListSorter(state => state.setIsValid);
    const validateList = useNumericListSorter(state => state.validateList);


    const sorterState = useNumericListSorter(useShallow (state => ({
        isAscending: state.isAscending, 
        listInput: state.listInput,
        sortedList: state.sortedList,
        errorList: state.errorList,
        createdList: state.createdList,
        isValid: state.isValidInput,
        containsEmptyValues: state.containsEmptyValues,
        containsNonNumerics: state.containsNonNumerics,
    })));

    const [value, setValue] = React.useState(sorterState.listInput);
    const [ouptput, setOutput] = React.useState("");
    const [errorOutput, setErrorOutput] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("Error: Invalid Values found in list");


    useEffect(() => {
        // Update the value when the list input changes
        console.log('value changed', sorterState.listInput);
        setValue(sorterState.listInput);
    }, [sorterState.listInput]);

    useEffect(() => {
        // Update the output when the sorted list changes
        console.log('sortedList changed', sorterState.sortedList);
        setOutput(sorterState.sortedList.join(', '));   
    }, [sorterState.sortedList]);
    
    useEffect(() => {
        if(sorterState.containsEmptyValues) {

            setErrorMessage('Error: Empty Values found in list');
        }
        else if(sorterState.containsNonNumerics) {
            setErrorMessage('Error: Invalid Values found in list');
        }
        else if ( sorterState.containsNonNumerics && sorterState.containsEmptyValues) {
            setErrorMessage('Error: Invalid Values and empty values found in list');
        }
        else{
            setErrorMessage('Error: Unknown error in list');
        }
        setErrorOutput(sorterState.errorList.join(',\n '));   
    }, [sorterState.errorList, sorterState.containsEmptyValues, sorterState.containsNonNumerics]);

    function handleListInputChange(e :ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function isValidList() {
        try {
           let isValid = false;
           isValid = validateList(sorterState.listInput);
            console.log('isValidList', isValid);
            if (!isValid) {;
                setOutput('');
            } else {
                setErrorOutput('');
            }

           return isValid;

        } catch (error) {
            setIsValid(false);
            setErrorMessage('Error: An unexpected error occurred while validating the list input.');
            return false;
        }
    }

    function handleSortSubmit() {
        let validated = isValidList();

        if (!validated) {
            return;
        }

        createList(value);
        sortList();
    }

    function handleToggleSortOrder() {

        let validated = isValidList();

        if (!validated) {
            return;
        }

        if (sorterState.listInput === value)
        {
            toggleSortOrder();
            sortList();
        }
        else {
            createList(value);
            toggleSortOrder();
            sortList();
        }
    }

  return (
    <>
    <div className="flex  flex-col items-center min-w-80 justify-center p-4 bg-gray-100 rounded-lg shadow-md max-w-[50%] mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Numeric List Sorter</h1>

        <div className="flex flex-row flex-wrap justify-between w-[100%] 
         bg-white p-5 items-center
         text-gray-700 shadow-m">
            <div className="flex-row w-[20] flex-grow items-center p-3">
                <h2 className="flex text-lg font-semibold">Enter Numbers to Sort:</h2>
            </div>
            <div className="flex-row w-[70] flex-grow items-center p-3">
                <div className="relative flex min-w-60  items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
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
            </div>
            <div className="flex-row flex-grow items-center p-3">
                <div className='flex w-16 items-center justify-end space-x-2'>
                                      <ButtonToggle
                                          toggleText={['Ascending', 'Descending']}
                                          isOn={sorterState.isAscending}
                                          onClick={handleToggleSortOrder}
                                          disabled={value.length === 0} />
                </div>
            </div>
            
        
            

            

        </div>
              <div className="flex flex-col w-[100%] justify-between bg-white p-5 items-center text-gray-700 shadow-m mt-4">
                {ouptput && sorterState.isValid && (
                    <>  
                        <div className="text-green-500 mt-2">
                            <p>success: List sorted successfully</p>
                        </div>
                        <div>
                            <TextAreaPrimary
                              maxRow={5}
                              displayValue={ouptput} />
                        </div>

                    </>
                )}

                {(errorOutput.length > 0) && (
                    <>
                        <div className="text-red-500 mt-2">
                            <p>{errorMessage}</p>
                        </div>
                        <div>
                            <TextAreaPrimary
                              maxRow={5}
                              displayValue={errorOutput} />
                        </div>
                    </>
                )}
             </div>

    </div>
    </>
  )
}

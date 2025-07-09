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
    const setErrorList = useNumericListSorter(state => state.setErrorList);
    const setIsValid = useNumericListSorter(state => state.setIsValid);


    const sorterState = useNumericListSorter(useShallow (state => ({
        isAscending: state.isAscending, 
        listInput: state.listInput,
        sortedList: state.sortedList,
        errorList: state.errorList,
        createdList: state.createdList,
        isValid: state.isValidInput,
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
        // Update the output when the error list changes
        console.log('errorList changed', sorterState.errorList);
        setErrorOutput(sorterState.errorList.join(', '));   
    }, [sorterState.errorList]);

    function handleListInputChange(e :ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function isValidList() {
        try {
           let containsEmptyValues = false;
           let containsNonNumerics = false;
           let previousValue :string | null = null;
           let hasPreviousValue = false;
           const errors: string[] = [];
           let isValid = false;
            sorterState.listInput
                .split(',')
                .forEach((val) => {
                     const trimmedVal = val.trim();
                     if (trimmedVal === '') {
                         containsEmptyValues = true;
                         if (hasPreviousValue) {
                             errors.push('Empty Value after ' + previousValue);
                         } else {
                             errors.push('Empty Value at start of list');
                         }
                     } else if (isNaN(Number(trimmedVal))) {
                         containsNonNumerics = true;
                         errors.push(trimmedVal);
                         previousValue = trimmedVal;
                     }
                     else
                     {
                         previousValue = trimmedVal;
                     }
                     hasPreviousValue = true;
                });


            isValid = errors.length === 0;

            if (!isValid) {
                console.log('Invalid input:', errors);

                if(containsEmptyValues) {

                    setErrorMessage('Error: Empty Values found in list');
                }
                else if ( containsNonNumerics && containsEmptyValues) {
                    setErrorMessage('Error: Invalid Values and empty values found in list');
                }
                else if(containsNonNumerics) {
                    setErrorMessage('Error: Invalid Values found in list');
                }
                else{
                    setErrorMessage('Error: Unknown error in list');
                }

                setIsValid(false);
                setErrorList(errors);
                setOutput('');
            } else {
                setErrorOutput('');
                setIsValid(true);
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
        setIsValid(validated || false);

        if (!validated) {
            return;
        }

        createList(value);
        sortList();
    }

    function handleToggleSortOrder() {

        let validated = isValidList();
        setIsValid(validated);

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

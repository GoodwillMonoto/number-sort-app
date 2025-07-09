import {create} from 'zustand';


type State = {
    isAscending: boolean;
    listInput: string;
    sortedList: string[];
    errorList: string[];
    createdList: number[];
    isValidInput : boolean;
    containsEmptyValues: boolean;
    containsNonNumerics: boolean;
};

type Actions = {
    setInput: (input: string) => void;
    toggleSortOrder: () => void;
    createList: (input: string) => void;
    sortList: () => void;
    clearList: () => void;
    setErrorList: (errorList: string[]) => void;
    setIsValid: (isValid: boolean) => void;
    validateList: (input:string) => boolean;
    

};


const initialState: State = {
    isAscending: true,
    listInput: '',
    sortedList: [],
    errorList: [],
    createdList: [],
    isValidInput: false,
    containsEmptyValues: false,
    containsNonNumerics: false
};


export const useNumericListSorter = create<State & Actions>((set) => ({
    ...initialState,
    setInput: (input: string) => set({listInput: input}),
    setErrorList: (errorList: string[]) => set({errorList:errorList}),
    setIsValid: (isValid: boolean) => set({isValidInput:isValid}),
    toggleSortOrder: () => set((state) => ({isAscending: !state.isAscending})),
    createList: (input: string) => {
        const newListToSort: number[] = [];
        input
        .split(',')
        .forEach((val) => {
            const trimmedVal = val.trim();
            if(trimmedVal !== '' && !isNaN(Number(trimmedVal))) 
            {
                console.log('Adding value to list:', trimmedVal);
                newListToSort.push(parseFloat(trimmedVal));
            }
            
        });
        set({
        createdList: newListToSort,
        errorList: []
    });},
    sortList: () =>
        set((state) => {
            if (state.errorList.length > 0 || state.createdList.length === 0) {
                return {sortedList: [], errorList: state.errorList};
            }
            
            const sorted = state.createdList.sort((a, b) =>
                state.isAscending ? a - b : b - a
            );

            return {sortedList: sorted.map(String)};
        }),
    validateList: (input:string) => {
        let containsEmptyValues = false;
        let containsNonNumerics = false;
        let previousValue :string | null = null;
        let hasPreviousValue = false;
        const errors: string[] = [];
        let isValid = false;
        
        console.log('Validating input:', input);
        input
        .split(',')
        .forEach((val) => {
             const trimmedVal = val.trim();
                console.log('Validating value:', trimmedVal);
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
        console.log('Validation Result:',
            isValid)

        set({ isValidInput: isValid , 
            errorList: errors, 
            containsEmptyValues : containsEmptyValues, 
            containsNonNumerics : containsNonNumerics});

        return isValid;
    },
    clearList: () => set(() => ({
        ...initialState
    }))

}));
import {create} from 'zustand';


type State = {
    isAscending: boolean;
    listInput: string;
    sortedList: string[];
    errorList: string[];
    createdList: number[];
    isValidInput : boolean;
};

type Actions = {
    setInput: (input: string) => void;
    toggleSortOrder: () => void;
    createList: (input: string) => void;
    sortList: () => void;
    clearList: () => void;
    setErrorList: (errorList: string[]) => void;
    setIsValid: (isValid: boolean) => void;

};


const initialState: State = {
    isAscending: true,
    listInput: '',
    sortedList: [],
    errorList: [],
    createdList: [],
    isValidInput: false
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
    clearList: () => set(() => ({
        ...initialState
    }))

}));
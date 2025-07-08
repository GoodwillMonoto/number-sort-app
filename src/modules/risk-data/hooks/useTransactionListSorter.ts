import {create} from 'zustand';


type State = {
    isAscending: boolean;
    listInput: string;
    sortedList: string[];
    errorList: string[];
    createdList: number[];
};

type Actions = {
    toggleSortOrder: () => void;
    setListInput: (input: string) => void;
    createList: () => void;
    sortList: () => void;
    isValidList: () => boolean;
    clearList: () => void;
};


const initialState: State = {
    isAscending: true,
    listInput: '',
    sortedList: [],
    errorList: [],
    createdList: []
};


export const useTransactionListSorter = create<State & Actions>((set) => ({
    ...initialState,

    toggleSortOrder: () => set((state) => ({isAscending: !state.isAscending})),
    setListInput: (input) => {
        const newListToSort: number[] = [];
        input
        .split(',')
        .forEach((val) => {
            const trimmedVal = val.trim();
            newListToSort.push(parseFloat(trimmedVal));
        });
        set({
        ...initialState,
        createdList: newListToSort,
        listInput: input,
        errorList: []
    });},
    createList: () => {
        
        set((state) => {
            const newListToSort: number[] = [];
            state.listInput
                .split(',')
                .forEach((val) => {
                    const trimmedVal = val.trim();
                    newListToSort.push(parseFloat(trimmedVal));
                });
            return {createdList: newListToSort, errorList: []};
        });
    },
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
    isValidList: () => {        
        let isValid = true;
        set((state) => {
            state.errorList = [];
            const errors = state.listInput
                .split(',')
                .map((val) => val.trim())
                .filter((trimmedVal) => trimmedVal === '' || isNaN(Number(trimmedVal)));
            isValid = errors.length === 0;
            return { errorList: errors };
        });
        return isValid;
    },
    clearList: () => set(() => ({
        ...initialState
    }))

}));
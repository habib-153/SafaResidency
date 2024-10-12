import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: '',
    status: '',
    categories: [],
    sort: '',
    page: 1,
    date: null,
    rates: ''
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setRates: (state, action) => {
            state.rates = action.payload;
        },
        removeRates: (state) => {
            state.rates = ''
        },
        setDate: (state, action) => {
            console.log(action.payload)
            state.date = action.payload;
        },
        removeDate: (state) => {
            state.date = null
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setPage: (state, action) => {
            console.log(action.payload)
            state.page = action.payload;
        },
        setCategory: (state, action) => {
            if(!state.categories.includes(action.payload)){
                console.log(action.payload)
                state.categories.push(action.payload);
            }
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        removeCategories: (state, action) => {
            state.categories = state.categories.filter(category => category !== action.payload)
        },
        clearFilters: (state) => {
            state.status = '';
            state.searchTerm = '';
            state.categories = [];
            state.sort = '';
            state.date = '';
            state.rates = '';
        }
    }
})

export const { setStatus, setRates, removeRates, setSearchTerm, setPage, setCategory, setSort, removeCategories, clearFilters, removeDate, setDate} = filterSlice.actions
export default filterSlice.reducer;
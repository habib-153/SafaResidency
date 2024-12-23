import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const today = dayjs().format('DD-MM-YYYY');
const tomorrow = dayjs().add(1, 'day').format('DD-MM-YYYY');

const initialState = {
    searchTerm: '',
    status: '',
    categories: [],
    sort: '',
    page: 1,
    date: [today, tomorrow],
    guests: {
      adults: 1,
      children: 0,
    }
  }

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        removeRates: (state) => {
            state.rates = ''
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setGuests: (state, action) => {
            state.guests = action.payload;
          },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setCategory: (state, action) => {
            if(!state.categories.includes(action.payload)){
                state.categories = []
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

export const { setStatus, setSearchTerm, setGuests, setPage, setCategory, setSort, removeCategories, clearFilters, removeDate, setDate} = filterSlice.actions
export default filterSlice.reducer;
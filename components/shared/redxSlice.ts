import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainState, TThemeMode } from './types'



// Define the initial state using that type
const initialState: IMainState = {
  page: 1,
  searchValue: '',
  searchMoviePage: 1,
  colorMode: 'light'
}

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updatePageNumber: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    updateMovieSearchPageNumber: (state, action: PayloadAction<number>) => {
      state.searchMoviePage = action.payload
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setColorMode:  (state, action: PayloadAction<TThemeMode>) => {
      state.colorMode = action.payload
    },
  },
})

export const { 
    updatePageNumber, 
    updateSearchValue,
    updateMovieSearchPageNumber,
    setColorMode
} = mainSlice.actions

export default mainSlice.reducer
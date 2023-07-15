import { createAction, createReducer } from '@reduxjs/toolkit'

export const setDataTable = createAction('setDataTable')
export const setCategories = createAction('setCategories')

const dataTableReducer = createReducer(
  {
    data: [],
    categories: []
  },
 {
  [setDataTable]: (state, action) => {
    return {
      ...state,
      data: action.payload
    }
  },
  [setCategories]: (state, action) => {
    return {
      ...state,
      categories: action.payload
    }
  },
 }
)

export {
  dataTableReducer
}
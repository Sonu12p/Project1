import { createAction, createReducer } from '@reduxjs/toolkit'

export const setDataActionNeeded = createAction('setDataActionNeeded')
export const updateActionNeeded = createAction('updateActionNeeded')

const actionNeededReducer = createReducer(
  {
    data: [],
  },
 {
  [setDataActionNeeded]: (state, action) => {
    return {
      ...state,
      data: action.payload
    }
  },
  [updateActionNeeded]: (state, action) => {
    const data = state.data.map((d) => {
      if (d.id === action.payload.id) {
        return action.payload;
      }
      return d;
    })
    return {
      ...state,
      data: data,
    }
  },
 }
)

export {
  actionNeededReducer
}
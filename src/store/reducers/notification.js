import { createAction, createReducer } from '@reduxjs/toolkit'

export const setNotification = createAction('setNotification')

const notificationReducer = createReducer(
  {
    data: [],
  },
 {
  [setNotification]: (state, action) => {
    return {
      ...state,
      data: action.payload
    }
  },
 }
)

export {
  notificationReducer
}
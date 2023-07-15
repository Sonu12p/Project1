import { configureStore } from '@reduxjs/toolkit'
import { dataTableReducer } from './reducers/data-table'
import { actionNeededReducer } from './reducers/action-needed'
import { notificationReducer } from './reducers/notification'

export default configureStore({
  reducer: {
    dataTableReducer,
    actionNeededReducer,
    notificationReducer,
  }
})
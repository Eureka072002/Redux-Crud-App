import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/todos/todosSlice'

export const store = configureStore({
    reducer: {
      users: usersReducer,
    },
})
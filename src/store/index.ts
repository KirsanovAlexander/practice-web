import {configureStore} from '@reduxjs/toolkit'
import PreorderReducer from './PreorderReducer'

const store = configureStore({
  reducer: {
    todos: PreorderReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
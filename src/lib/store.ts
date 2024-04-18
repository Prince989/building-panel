import {configureStore} from '@reduxjs/toolkit'
import  GlobalSlice  from './features/global'
import  ProviderSlice from './features/provider'

export const store = configureStore({
  reducer: {
    GlobalSlice,
    ProviderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import { taskApi } from './Tasks/Tasks.store'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import UpdateModalReducer from './Tasks/UpdateModal.store'
import CreateModalReducer from './Tasks/CreateModal.store'
import RemoveModalReducer from './Tasks/RemoveModal.store'
import ThemeSwitchReducer from './ThemeSwitch.store'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, ThemeSwitchReducer)

const store = configureStore({
  devTools: true,
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    updateModal: UpdateModalReducer,
    createModal: CreateModalReducer,
    removeModal: RemoveModalReducer,
    ThemeSwitch: persistedReducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(taskApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export default store

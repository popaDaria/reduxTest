import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoSlice from '../slices/todoSlice';

const persistConfig = {
  key: "root",
  storage
};

const persistedReducerTodo = persistReducer(persistConfig, todoSlice);

export const store = configureStore({
  reducer: {
    counter: persistedReducerTodo,
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
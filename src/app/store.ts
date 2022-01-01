import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import noteReducer from '../features/note/noteSlice';
import windowSizeReducer from '../features/windowSize/windowSizeSlice';
import userReducer from '../features/user/userSlice';
import projectReducer from '../features/project/projectSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    note: noteReducer,
    windowSize: windowSizeReducer,
    user: userReducer,
    project: projectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

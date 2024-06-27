import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import positionReducer from './positionSlice';

export const store = configureStore({
  reducer: {
    positions: positionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

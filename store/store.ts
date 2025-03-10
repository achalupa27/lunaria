import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tabReducer from './slices/tab-slice';

export const store = configureStore({
    reducer: {
        tab: tabReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

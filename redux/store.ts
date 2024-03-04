import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import makeReducer from './slices/makeSlice';
import saveReducer from './slices/saveSlice';
import spendReducer from './slices/spendSlice';
import tabReducer from './slices/tabSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        tab: tabReducer,
        making: makeReducer,
        saving: saveReducer,
        spending: spendReducer,
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

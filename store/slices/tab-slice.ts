import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface TabState {
    tab: string;
}

const initialState: TabState = {
    tab: 'Spend',
};

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setTab: (state, action: PayloadAction<string>) => {
            state.tab = action.payload;
        },
    },
});

export const { setTab } = tabSlice.actions;

export const selectTab = (state: RootState) => state.tab.tab;

export default tabSlice.reducer;

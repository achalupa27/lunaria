import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SpendingState {
    spending: Spend[];
}

const initialState: SpendingState = {
    spending: [],
};

const spendSlice = createSlice({
    name: 'spending',
    initialState,
    reducers: {
        setSpending: (state, action: PayloadAction<Spend[]>) => {
            state.spending = action.payload;
        },
        addSpending: (state, action: PayloadAction<Spend>) => {
            state.spending.push(action.payload);
        },
        updateSpendingState: (state, action: PayloadAction<Spend>) => {
            const updatedSpend = action.payload;
            const index = state.spending.findIndex((spend) => spend.id === updatedSpend.id);

            if (index !== -1) {
                state.spending[index] = updatedSpend;
            }
        },
    },
});

export const { setSpending, addSpending, updateSpendingState } = spendSlice.actions;

export const selectSpending = (state: RootState) => state.spending.spending;

export default spendSlice.reducer;

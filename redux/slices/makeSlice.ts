import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface MakingState {
    making: Make[];
}

const initialState: MakingState = {
    making: [],
};

const makeSlice = createSlice({
    name: 'making',
    initialState,
    reducers: {
        setMaking: (state, action: PayloadAction<Make[]>) => {
            state.making = action.payload;
        },
        addMaking: (state, action: PayloadAction<Make>) => {
            state.making?.push(action.payload);
        },
        updateMakingState: (state, action: PayloadAction<Make>) => {
            const updatedMake = action.payload;
            const index = state.making?.findIndex((make) => make.id === updatedMake.id);

            if (index && index !== -1) {
                state.making![index] = updatedMake;
            }
        },
    },
});

export const { setMaking, addMaking, updateMakingState } = makeSlice.actions;

export const selectMaking = (state: RootState) => state.making.making;

export default makeSlice.reducer;

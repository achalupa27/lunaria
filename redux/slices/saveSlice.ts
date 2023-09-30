import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SavingState {
    saving: Save[];
}

const initialState: SavingState = {
    saving: [],
};

const saveSlice = createSlice({
    name: 'saving',
    initialState,
    reducers: {
        setSaving: (state, action: PayloadAction<Save[]>) => {
            state.saving = action.payload;
        },
        addSaving: (state, action: PayloadAction<Save>) => {
            state.saving?.push(action.payload);
        },
        updateSavingState: (state, action: PayloadAction<Save>) => {
            const updatedSave = action.payload;
            const index = state.saving?.findIndex((save) => save.id === updatedSave.id);

            if (index && index !== -1) {
                state.saving![index] = updatedSave;
            }
        },
    },
});

export const { setSaving, addSaving, updateSavingState } = saveSlice.actions;

export const selectSaving = (state: RootState) => state.saving.saving;

export default saveSlice.reducer;

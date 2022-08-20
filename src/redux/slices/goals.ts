import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TGoal } from "../../Pages/common/hooks/useGoals";

type TGoalsState = {
    items: TGoal[];
};

const initialState: TGoalsState = {
    items: [],
};

export const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        addGoalsAction: (state, action: PayloadAction<TGoal>) => {
            state.items.push(action.payload);
        },
        incrementGoalAction: (
            state,
            action: PayloadAction<{ id: number; amount: number }>
        ) => {
            const item = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                item.amount += action.payload.amount;
                item.replenishmentCount += 1;
            }
        },
        deleteGoalsAction: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const { addGoalsAction, incrementGoalAction, deleteGoalsAction } =
    goalsSlice.actions;

export default goalsSlice.reducer;

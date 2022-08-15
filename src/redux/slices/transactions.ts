import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TTransaction } from "../../Pages/common/hooks/useTransactions";

type TTransactionState = {
    items: TTransaction[];
};

const initialState: TTransactionState = {
    items: [],
};

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransactionAction: (state, action: PayloadAction<TTransaction>) => {
            state.items.push(action.payload);
        },
        deleteTransactionAction: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id === action.payload
            );
        },
    },
});

export const { addTransactionAction, deleteTransactionAction } =
    transactionsSlice.actions;

export default transactionsSlice.reducer;

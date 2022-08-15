import { createSlice } from "@reduxjs/toolkit";
import { TGlobal } from "../../Pages/common/hooks/useTransactions";
import { transactionsSlice } from "./transactions";

type TGlobalTransactionState = {
    data: TGlobal;
};

const initialState: TGlobalTransactionState = {
    data: {
        income: 0,
        expense: 0,
    },
};

export const globalTransactionsSlice = createSlice({
    name: "globalTransactions",
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-expect-error
        [transactionsSlice.actions.addTransactionAction]: (state, action) => {
            if (action.payload.category) {
                state.data.expense += action.payload.amount;
            } else {
                state.data.income += action.payload.amount;
            }
        },
    },
});

// export const {} = globalTransactionsSlice.actions;

export default globalTransactionsSlice.reducer;

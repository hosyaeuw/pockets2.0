import { createSlice } from "@reduxjs/toolkit";
import { TGlobal } from "../../Pages/common/hooks/useTransactions";
import { goalsSlice } from "./goals";
import { transactionsSlice } from "./transactions";

type TGlobalTransactionState = {
    data: TGlobal;
    freeMoney: number;
};

const initialState: TGlobalTransactionState = {
    data: {
        income: 0,
        expense: 0,
    },
    freeMoney: 0,
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
                state.freeMoney -= action.payload.amount;
            } else {
                state.data.income += action.payload.amount;
                state.freeMoney += action.payload.amount;
            }
        },
        // @ts-expect-error
        [goalsSlice.actions.addGoalsAction]: (state, action) => {
            if (action.payload.category) {
                state.freeMoney -= action.payload.initial_deposit;
            }
        }
    },
});

// export const {} = globalTransactionsSlice.actions;

export default globalTransactionsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCategory } from "../../Pages/common/hooks/useCategories";
import { transactionsSlice } from "./transactions";

type TCategoriesState = {
    items: TCategory[];
};

const initialState: TCategoriesState = {
    items: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategoryAction: (state, action: PayloadAction<TCategory>) => {
            state.items.push(action.payload);
        },
        deleteCategoryAction: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id === action.payload
            );
        },
    },
    extraReducers: {
        // @ts-expect-error
        [transactionsSlice.actions.addTransactionAction]: (state, action) => {
            if (action.payload.category) {
                const currentCategory = state.items.find(
                    (item: TCategory) => item.id === action.payload.category.id
                );
                if (currentCategory) {
                    currentCategory.amount += action.payload.amount;
                }
            }
        },
    },
});

export const { addCategoryAction, deleteCategoryAction } =
    categoriesSlice.actions;

export default categoriesSlice.reducer;

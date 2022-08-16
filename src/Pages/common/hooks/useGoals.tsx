import React from "react";
import { TCategory } from "./useCategories";

type TGoal = {
    id: number;
    name: string;
    amount: number;
    initial_deposit: number;
    percent: number;
    deposit_term: number;
    total_amount: number;
    prev_month_amount: number;
    days_to_end: number;
    is_closed: boolean;
    created_at: string;
    closed_at: string | null;
    category: TCategory;
};

const useGoals = () => {
    const addGoal = React.useCallback(
        (data: {
            name: string;
            amount: number;
            initial_deposit: number;
            deposit_term: number;
            percent: number;
            category: TCategory;
        }) => {
            console.log(data);
        },
        []
    );

    return { addGoal };
};

export default useGoals;

import * as React from "react";
import { useDispatch } from "react-redux";
import { useTypesSelector } from "../../../hooks/useTypesSelector";
import { addCategoryAction } from "../../../redux/slices/categories";

export type TCategory = {
    id: number;
    name: string;
    amount: number;
};

const useCategories = () => {
    const dispatch = useDispatch();
    const [items] = useTypesSelector(({ categories }) => [categories.items]);

    const addCategory = React.useCallback(
        (name: string) => {
            dispatch(
                addCategoryAction({
                    id: (items[items.length - 1]?.id ?? 0) + 1,
                    name,
                    amount: 0,
                })
            );
        },
        [dispatch, items]
    );

    return { addCategory, items };
};

export default useCategories;

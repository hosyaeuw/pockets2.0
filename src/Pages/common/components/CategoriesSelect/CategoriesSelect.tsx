import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Select, Text } from "../../../../components";
import useCategories, { TCategory } from "../../hooks/useCategories";

type Props<T1 extends FieldValues, T2 extends Path<T1>> = {
    field: ControllerRenderProps<T1, T2>;
};

const CategoriesSelect = <T1, T2 extends Path<T1>>({
    field,
}: Props<T1, T2>): JSX.Element => {
    const { items: categories } = useCategories();
    const [value, setValue] = React.useState<TCategory | null>();

    const onChangeHandler = React.useCallback(
        (value: TCategory) => {
            setValue(value);
            field.onChange(value);
        },
        [field]
    );

    return (
        <Select {...field} value={value?.name} onChange={onChangeHandler}>
            {categories.map((category) => (
                <Select.Option value={category}>
                    <Text>{category.name}</Text>
                </Select.Option>
            ))}
        </Select>
    );
};

export default CategoriesSelect;

import * as React from 'react';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { Select, Text } from '../../../../components';
import useFetchCategories from '../../hooks/categories/useFetchCategories';
import { TCategory } from '../../hooks/useCategories';

type Props<T1 extends FieldValues, T2 extends Path<T1>> = {
    field: ControllerRenderProps<T1, T2>;
};

const CategoriesSelect = <T1, T2 extends Path<T1>>({
    field: { ref, ...field },
}: Props<T1, T2>): JSX.Element => {
    const { items } = useFetchCategories();

    const [value, setValue] = React.useState<TCategory | null>();

    const onChangeHandler = React.useCallback(
        (value: TCategory) => {
            setValue(value);
            field.onChange(value.id);
        },
        [field],
    );

    return (
        <Select {...field} value={value?.name} onChange={onChangeHandler}>
            {items.map(category => (
                <Select.Option
                    selected={category.id === value?.id}
                    value={category}
                    key={category.id}
                >
                    <Text>{category.name}</Text>
                </Select.Option>
            ))}
        </Select>
    );
};

export default CategoriesSelect;

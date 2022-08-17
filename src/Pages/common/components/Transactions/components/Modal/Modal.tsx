import * as React from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";

import {
    Button,
    PocketsModal,
    Text,
    Tabs,
    Input,
    Select,
    InputsContainer,
} from "../../../../../../components";
import useCategories, {
    TCategory,
} from "../../../../../common/hooks/useCategories";
import useTransactions, {
    TransactionType,
} from "../../../../../common/hooks/useTransactions";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    startTab?: TransactionType;
    onClose: () => void;
};

type TTab = {
    title: string;
    value: TransactionType;
};

const tabs: TTab[] = [
    {
        title: "Доход +",
        value: "income",
    },
    {
        title: "Расход -",
        value: "expense",
    },
];

type TFormData = {
    date: string;
    amount: number;
    category?: TCategory;
};

const Modal: React.FC<Props> = ({ show, onClose, startTab = "income" }) => {
    const { addTransaction } = useTransactions();

    const { handleSubmit, control, reset, getValues } =
        useForm<TFormData>();
    const [tab, setTab] = React.useState<TransactionType>(startTab);

    const onChangeTabHandler = React.useCallback(
        (value: string) => {
            reset({ ...getValues(), category: undefined });
            setTab(value as TransactionType);
        },
        [reset, getValues]
    );

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            addTransaction({
                ...data,
                category: data.category,
                amount: +data.amount,
                type: tab,
            });
            reset();
            onClose();
        },
        [addTransaction, tab, reset, onClose]
    );

    return (
        <PocketsModal
            show={show}
            onClose={onClose}
            className={styles.modal}
            title="Добавить операцию"
        >
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className={styles.form}
            >
                <div className={styles.form__tabs}>
                    <Tabs
                        options={tabs}
                        onChange={onChangeTabHandler}
                        defaultValue={tab}
                    />
                </div>
                <InputsContainer>
                    <Controller
                        control={control}
                        name="date"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <Input type="date" {...field} placeholder="Дата" />
                        )}
                    />
                    {tab === "expense" && (
                        <Controller
                            control={control}
                            name="category"
                            rules={{
                                required: "Обязательное поле",
                            }}
                            render={({ field }) => (
                                <CategoriesSelect field={field} />
                            )}
                        />
                    )}
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <Input
                                type="number"
                                placeholder="Сумма"
                                {...field}
                            />
                        )}
                    />
                </InputsContainer>
                <div className={styles.form__btn}>
                    <Button type="submit">
                        <Text size="l">Добавить</Text>
                    </Button>
                </div>
            </form>
        </PocketsModal>
    );
};

export default Modal;
// TODO: вынести
const CategoriesSelect: React.FC<{
    field: ControllerRenderProps<TFormData, "category">;
}> = ({ field }) => {
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

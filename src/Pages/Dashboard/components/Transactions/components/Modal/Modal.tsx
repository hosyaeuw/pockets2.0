import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import {
    Button,
    PocketsModal,
    Text,
    Tabs,
    Input,
    Select,
    InputsContainer,
} from "../../../../../../components";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
};

enum TabsCategories {
    income = "income",
    expense = "expense",
}

const tabs = [
    {
        title: "Доход +",
        value: TabsCategories.income,
    },
    {
        title: "Расход -",
        value: TabsCategories.expense,
    },
];

const options = Array(8)
    .fill(0)
    .map((_, index) => index);

const Modal: React.FC<Props> = ({ show, onClose }) => {
    const { handleSubmit, control } = useForm();
    const [tab, setTab] = React.useState(TabsCategories.income);

    const onSubmitHandler = React.useCallback(
        (data: any) => console.log(data),
        []
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
                        onChange={(value) => {
                            setTab(value as TabsCategories);
                        }}
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
                    {tab === TabsCategories.expense && (
                        <Controller
                            control={control}
                            name="category"
                            rules={{
                                required: "Обязательное поле",
                            }}
                            render={({ field }) => (
                                <Select {...field}>
                                    {options.map((value) => (
                                        <Select.Option value={value}>
                                            <Text>{value}</Text>
                                        </Select.Option>
                                    ))}
                                </Select>
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
                            <Input placeholder="Сумма" {...field} />
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

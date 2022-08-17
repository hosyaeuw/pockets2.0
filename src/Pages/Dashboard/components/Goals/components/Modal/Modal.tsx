import React from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import {
    Button,
    Input,
    PocketsModal,
    Select,
    Text,
} from "../../../../../../components";
import useCategories, {
    TCategory,
} from "../../../../../common/hooks/useCategories";
import useGoals from "../../../../../common/hooks/useGoals";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
};

type TFormData = {
    name: string;
    total_amount: number;
    initial_deposit: number;
    deposit_term: number;
    percent: number;
    category: TCategory;
};

const Modal: React.FC<Props> = ({ show, onClose }) => {
    const { handleSubmit, control, reset } = useForm<TFormData>();
    const { addGoal } = useGoals();

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            addGoal(data);
            reset();
            onClose();
        },
        [addGoal, reset, onClose]
    );

    return (
        <PocketsModal
            show={show}
            onClose={onClose}
            className={styles.modal}
            title="Создание цели"
        >
            <Text align="center" color="secondary">
                Создайте цель. Разместите средства под процент.. Получайте
                статистику по движению к цели и анализируйте выгоду от своего
                вклада!
            </Text>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className={styles.form}
            >
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: "Обязательное поле",
                    }}
                    render={({ field }) => (
                        <Input {...field} placeholder="Введите название цели" />
                    )}
                />
                <div className={styles.field}>
                    <Text>Сколько вы планируете накопить</Text>
                    <Controller
                        control={control}
                        name="total_amount"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_amount}>
                                <Input
                                    type="number"
                                    {...field}
                                    placeholder="0"
                                />
                            </div>
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <Text>С какой суммы планируете начать?</Text>
                    <Controller
                        control={control}
                        name="initial_deposit"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_amount}>
                                <Input
                                    type="number"
                                    {...field}
                                    placeholder="0"
                                />
                            </div>
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <Text>Категория</Text>
                    <Controller
                        control={control}
                        name="category"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_select}>
                                <CategoriesSelect field={field} />
                            </div>
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <Text>Срок (месяцы)</Text>
                    <Controller
                        control={control}
                        name="deposit_term"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_number}>
                                <Input
                                    type="number"
                                    {...field}
                                    placeholder="1"
                                />
                            </div>
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <Text>Проценты</Text>
                    <Controller
                        control={control}
                        name="percent"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_number}>
                                <Input {...field} placeholder="0%" />
                            </div>
                        )}
                    />
                </div>
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

// TODO: вынести и соединить с модалки транзаций
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

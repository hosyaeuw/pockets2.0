import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Input,
    PocketsModal,
    Text,
} from "../../../../../../components";
import { CategoriesSelect } from "../../../../../common/components";
import { TCategory } from "../../../../../common/hooks/useCategories";
import useGoals from "../../../../../common/hooks/useGoals";
import useTransactions from "../../../../../common/hooks/useTransactions";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
};

type TFormData = {
    name: string;
    total_amount: string;
    initial_deposit: string;
    deposit_term: string;
    percent: string;
    category: TCategory;
};
// TODO: создать контроллеры через хук useController
const Modal: React.FC<Props> = ({ show, onClose }) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TFormData>();
    const { addGoal } = useGoals();
    const { freeMoney } = useTransactions();

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            addGoal({
                ...data,
                total_amount: +data.total_amount,
                initial_deposit: +data.initial_deposit,
                deposit_term: +data.deposit_term,
                percent: +data.percent,
            });
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
                        <Input
                            {...field}
                            error={errors["name"]?.message}
                            placeholder="Введите название цели"
                        />
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
                                    error={errors["total_amount"]?.message}
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
                            validate: (data) => {
                                if (+data > freeMoney) {
                                    return "У вас нету столько денег";
                                }
                            },
                        }}
                        render={({ field }) => (
                            <div className={styles.field_amount}>
                                <Input
                                    type="number"
                                    {...field}
                                    placeholder="0"
                                    error={errors["initial_deposit"]?.message}
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
                                <CategoriesSelect<TFormData, "category">
                                    field={field}
                                />
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
                                    error={errors["deposit_term"]?.message}
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
                                <Input
                                    error={errors["percent"]?.message}
                                    {...field}
                                    placeholder="0%"
                                />
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

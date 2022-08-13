import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Input,
    PocketsModal,
    Select,
    Text,
} from "../../../../../../components";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
};

const options = Array(8)
    .fill(0)
    .map((_, index) => index);

const Modal: React.FC<Props> = ({ show, onClose }) => {
    const { handleSubmit, control } = useForm();

    const onSubmitHandler = React.useCallback(
        (data: any) => console.log(data),
        []
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
                    name="goals_name"
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
                        name="all_amount"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_amount}>
                                <Input {...field} placeholder="0" />
                            </div>
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <Text>С какой суммы планируете начать?</Text>
                    <Controller
                        control={control}
                        name="start_amount"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_amount}>
                                <Input {...field} placeholder="0" />
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
                                <Select {...field}>
                                    {options.map((value) => (
                                        <Select.Option value={value}>
                                            <Text>{value}</Text>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <Text>Срок (месяцы)</Text>
                    <Controller
                        control={control}
                        name="deadline"
                        rules={{
                            required: "Обязательное поле",
                        }}
                        render={({ field }) => (
                            <div className={styles.field_number}>
                                <Input {...field} placeholder="1" />
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

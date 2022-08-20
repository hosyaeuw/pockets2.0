import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Input,
    Plate,
    PocketsModal,
    Text,
} from "../../../../../../components";
import useGoals, { TGoal } from "../../../../../common/hooks/useGoals";
import useModal from "../../../../../common/hooks/useModal";
import useTransactions from "../../../../../common/hooks/useTransactions";
import GoalCard from "../GoalCard/GoalCard";

import styles from "./GoalCardWithModal.module.scss";

type TFormData = {
    amount: string;
};

const Modal: React.FC<{ item: TGoal; show: boolean; onClose: () => void }> = ({
    item,
    show,
    onClose,
}) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TFormData>();
    const { incrementGoal } = useGoals();
    const { freeMoney } = useTransactions();

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            incrementGoal({ id: item.id, amount: +data.amount });
            reset();
            onClose();
        },
        [reset, onClose, incrementGoal, item]
    );

    return (
        <PocketsModal
            show={show}
            onClose={onClose}
            className={styles.modal}
            title="Пополнить цель"
        >
            <div className={styles["modal__plate-container"]}>
                <Plate title="Текущий баланс" className={styles.modal__plate} />
                <Plate
                    title={item.name}
                    className={styles.modal__plate}
                    rightComponent={
                        <div>
                            <Text>
                                <b>{item.amount}</b>
                            </Text>{" "}
                            <Text>/ {item.total_amount}</Text>
                        </div>
                    }
                />
            </div>
            <div className={styles["form-container"]}>
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className={styles.form}
                >
                    <div className={styles.field}>
                        <Text color="secondary">Введите сумму пополнения</Text>
                        <Controller
                            control={control}
                            name="amount"
                            rules={{
                                required: "Обязательное поле",
                                validate: (data) => {
                                    if (+data > freeMoney) {
                                        return "У вас нету столько денег";
                                    }
                                },
                            }}
                            render={({ field }) => (
                                <div
                                    className={styles["form__input-container"]}
                                >
                                    <Input
                                        error={errors["amount"]?.message}
                                        type="number"
                                        {...field}
                                        placeholder={freeMoney > 10 ? `от 10 до ${freeMoney}` : '0'}
                                    />
                                </div>
                            )}
                        />
                    </div>
                    <div className={styles["form__btn-container"]}>
                        <Button type="submit">
                            <Text size="l">Пополнить</Text>
                        </Button>
                    </div>
                </form>
            </div>
        </PocketsModal>
    );
};

const GoalCardWithModal: React.FC<{ item: TGoal }> = ({ item }) => {
    const { showModal, toggleShowModalHandler } = useModal();
    return (
        <>
            <Modal
                item={item}
                show={showModal}
                onClose={toggleShowModalHandler}
            />
            <GoalCard item={item} onClick={toggleShowModalHandler} />
        </>
    );
};

export default GoalCardWithModal;

import React from "react";
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
    const { handleSubmit, control, reset } = useForm<TFormData>();
    const { incrementGoal } = useGoals();

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
            <Plate title="Текущий баланс" />
            <Plate
                title={item.name}
                rightComponent={
                    <div>
                        <Text>
                            <b>{item.amount}</b>
                        </Text>{" "}
                        <Text>/ {item.total_amount}</Text>
                    </div>
                }
            />
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
                            }}
                            render={({ field }) => (
                                <div className={styles['form__input-container']}>
                                    <Input
                                        type="number"
                                        {...field}
                                        placeholder="0"
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

import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Button, Input, Plate, PocketsModal, Text } from '../../../../../../components';
import { AmountHelper } from '../../../../../../utils/amountHelper';
import useInvestGoal from '../../../../../common/hooks/goals/useInvestGoal';
import useFetchBalance from '../../../../../common/hooks/transactions/useFetchTransactionsBalance';
import { TGoal } from '../../../../../common/hooks/useGoals';
import useModal from '../../../../../common/hooks/useModal';
import GoalCard from '../GoalCard/GoalCard';

import styles from './GoalCardWithModal.module.scss';

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

    const { investGoal, isLoading } = useInvestGoal();

    const {
        data: { balance },
    } = useFetchBalance();

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            investGoal(item.id, +data.amount).then(() => {
                reset();
                onClose();
            });
        },
        [reset, onClose, investGoal, item],
    );

    return (
        <PocketsModal show={show} onClose={onClose} className={styles.modal} title="Пополнить цель">
            <div className={styles['modal__plate-container']}>
                <Plate
                    title="Текущий баланс"
                    className={styles.modal__plate}
                    rightComponent={
                        <Text>
                            <b>{AmountHelper.format(balance)}</b>
                        </Text>
                    }
                />
                <Plate
                    title={item.name}
                    className={styles.modal__plate}
                    rightComponent={
                        <div>
                            <Text>
                                <b>{AmountHelper.format(item.amount)}</b>
                            </Text>{' '}
                            <Text>/ {AmountHelper.format(item.total_amount)}</Text>
                        </div>
                    }
                />
            </div>
            <div className={styles['form-container']}>
                <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
                    <div className={styles.field}>
                        <Text color="secondary">Введите сумму пополнения</Text>
                        <Controller
                            control={control}
                            name="amount"
                            rules={{
                                required: 'Обязательное поле',
                                validate: data => {
                                    if (+data > balance) {
                                        return 'У вас нету столько денег';
                                    }
                                },
                            }}
                            render={({ field }) => (
                                <div className={styles['form__input-container']}>
                                    <Input
                                        error={errors['amount']?.message}
                                        type="number"
                                        {...field}
                                        placeholder={
                                            balance > 10
                                                ? `от 10 до ${AmountHelper.format(balance)}`
                                                : '0'
                                        }
                                    />
                                </div>
                            )}
                        />
                    </div>
                    <div className={styles['form__btn-container']}>
                        <Button type="submit" loading={isLoading}>
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
            <Modal item={item} show={showModal} onClose={toggleShowModalHandler} />
            <GoalCard item={item} onClick={toggleShowModalHandler} />
        </>
    );
};

export default GoalCardWithModal;

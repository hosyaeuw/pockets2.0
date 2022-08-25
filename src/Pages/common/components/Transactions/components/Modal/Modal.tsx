import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';

import {
    Button,
    PocketsModal,
    Text,
    Tabs,
    Input,
    InputsContainer,
} from '../../../../../../components';
import { TransactionType } from '../../../../../common/hooks/useTransactions';
import useAddTransaction from '../../../../hooks/transactions/useAddTransaction';
import CategoriesSelect from '../../../CategoriesSelect';

import styles from './Modal.module.scss';

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
        title: 'Доход +',
        value: 'income',
    },
    {
        title: 'Расход -',
        value: 'expense',
    },
];

type TFormData = {
    date: string;
    amount: string;
    category?: number;
};

const Modal: React.FC<Props> = ({ show, onClose, startTab = 'income' }) => {
    const { addTransaction } = useAddTransaction();

    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors },
    } = useForm<TFormData>();
    const [tab, setTab] = React.useState<TransactionType>(startTab);

    const onChangeTabHandler = React.useCallback(
        (value: string) => {
            reset({ ...getValues(), category: undefined });
            setTab(value as TransactionType);
        },
        [reset, getValues],
    );

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            addTransaction(+data.amount, data.date, data.category);
            reset();
            onClose();
        },
        [addTransaction, reset, onClose],
    );

    return (
        <PocketsModal
            show={show}
            onClose={onClose}
            className={styles.modal}
            title="Добавить операцию"
        >
            <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
                <div className={styles.form__tabs}>
                    <Tabs options={tabs} onChange={onChangeTabHandler} defaultValue={tab} />
                </div>
                <InputsContainer>
                    <Controller
                        control={control}
                        name="date"
                        rules={{
                            required: 'Обязательное поле',
                        }}
                        render={({ field: { ref, ...field } }) => (
                            <Input
                                type="date"
                                {...field}
                                error={errors['date']?.message}
                                placeholder="Дата"
                            />
                        )}
                    />
                    {tab === 'expense' && (
                        <Controller
                            control={control}
                            name="category"
                            rules={{
                                required: 'Обязательное поле',
                            }}
                            render={({ field }) => (
                                <CategoriesSelect<TFormData, 'category'> field={field} />
                            )}
                        />
                    )}
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: 'Обязательное поле',
                        }}
                        render={({ field: { ref, ...field } }) => (
                            <Input
                                type="number"
                                placeholder="Сумма"
                                error={errors['amount']?.message}
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

import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Button, Input, PocketsModal, Text } from '../../../../../../../../components';
import useAddCategory from '../../../../../../../common/hooks/categories/useAddCategory';

import styles from './Modal.module.scss';

type Props = {
    show: boolean;
    onClose: () => void;
};

type TFormData = {
    category_name: string;
};

const Modal: React.FC<Props> = ({ show, onClose }) => {
    const { addCategory } = useAddCategory();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TFormData>();

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            addCategory(data.category_name).then(() => {
                reset();
                onClose();
            });
        },
        [addCategory, onClose, reset],
    );

    return (
        <PocketsModal
            show={show}
            onClose={onClose}
            className={styles.modal}
            title="Добавить категорию"
        >
            <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
                <Controller
                    control={control}
                    name="category_name"
                    rules={{
                        required: 'Обязательное поле',
                    }}
                    render={({ field: { ref, ...field } }) => (
                        <Input
                            {...field}
                            placeholder="Введите название категории"
                            error={errors['category_name']?.message}
                        />
                    )}
                />
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

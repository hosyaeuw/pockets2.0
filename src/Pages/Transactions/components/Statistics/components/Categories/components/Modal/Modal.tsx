import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Input,
    PocketsModal,
    Text,
} from "../../../../../../../../components";
import useCategories from "../../../../../../../../hooks/useCategories";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
};

type TFormData = {
    category_name: string;
};

const Modal: React.FC<Props> = ({ show, onClose }) => {
    const { addCategory } = useCategories();
    const { handleSubmit, control } = useForm<TFormData>();

    const onSubmitHandler = React.useCallback(
        (data: TFormData) => {
            addCategory(data.category_name);
            onClose();
        },
        [addCategory, onClose]
    );

    return (
        <PocketsModal
            show={show}
            onClose={onClose}
            className={styles.modal}
            title="Добавить категорию"
        >
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className={styles.form}
            >
                <Controller
                    control={control}
                    name="category_name"
                    rules={{
                        required: "Обязательное поле",
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Введите название категории"
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

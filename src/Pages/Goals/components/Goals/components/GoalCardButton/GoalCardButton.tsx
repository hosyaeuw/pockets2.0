import React from "react";
import { EllipsisIcon } from "../../../../../../assets";
import { Button, Text } from "../../../../../../components";
import useGoals, { TGoal } from "../../../../../common/hooks/useGoals";
import useModal from "../../../../../common/hooks/useModal";

import styles from "./GoalCardButton.module.scss";

type Props = {
    item: TGoal;
};

const Popup: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popup__item}>
                <Text>Подробности</Text>
            </div>
            <div className={styles.popup__item} onClick={onClick}>
                <Text color="danger">Удалить</Text>
            </div>
        </div>
    );
};

const GoalCardButton: React.FC<Props> = ({ item }) => {
    const { deleteGoal } = useGoals();
    const { showModal, toggleShowModalHandler } = useModal();

    const onDeleteHandler = React.useCallback(() => {
        deleteGoal(item.id);
        toggleShowModalHandler();
    }, [item.id, deleteGoal, toggleShowModalHandler]);

    return (
        <div className={styles["button-container"]}>
            <Button variant="ghost" onClick={toggleShowModalHandler}>
                <div className={styles.button}>
                    <EllipsisIcon />
                </div>
            </Button>
            {showModal && <Popup onClick={onDeleteHandler} />}
        </div>
    );
};

export default GoalCardButton;

// TODO: переименовать компонент
import * as React from "react";
import { Button, Content, Text } from "../../../../../../components";
import { GoalPlate } from "../../../../../common/components";
import useGoals from "../../../../../common/hooks/useGoals";
import useModal from "../../../../../common/hooks/useModal";
import Modal from "../Modal";

import styles from "./GoalList.module.scss";

type Props = {};

const Wrapper: React.FC<Props> = () => {
    const { items } = useGoals();

    const { showModal, toggleShowModalHandler } = useModal();

    const sortedItemsByPercent = React.useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    (b.amount / b.total_amount) * 100 -
                    (a.amount / a.total_amount) * 100
            ),
        [items]
    );

    if (items.length === 0) {
        return (
            <Content
                variant="primary"
                className={styles["goal-list__empty-container"]}
            >
                <Modal show={showModal} onClose={toggleShowModalHandler} />
                <div className={styles['goal-list__empty']}>
                    <div className={styles["goal-list__empty-wrapper"]}>
                        <Text size="l" color="secondary">
                            У вас нет ни одной цели
                        </Text>
                        <Button onClick={toggleShowModalHandler}>
                            <Text size="l">Добавить цель</Text>
                        </Button>
                    </div>
                </div>
            </Content>
        );
    }

    return (
        <div
            className={styles['goal-list__items']}
        >
            {sortedItemsByPercent.slice(0, 3).map((item) => (
                <GoalPlate key={item.id} goal={item} />
            ))}
        </div>
    );
};

const GoalList = () => {
    return (
        <div className={styles["goal-list-container"]}>
            <Wrapper />
        </div>
    );
};

export default GoalList;

// TODO: переименовать компонент
import * as React from "react";
import { Button, Content, Text } from "../../../../../../components";
import { GoalPlate } from "../../../../../common/components";
import useGoals from "../../../../../common/hooks/useGoals";
import useModal from "../../../../../common/hooks/useModal";
import Modal from "../Modal";

import styles from "./Table.module.scss";

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
                className={styles["table__empty-container"]}
            >
                <Modal show={showModal} onClose={toggleShowModalHandler} />
                <div className={styles.table__empty}>
                    <div className={styles["table__empty-wrapper"]}>
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
            style={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 6,
            }}
        >
            {sortedItemsByPercent.slice(0, 3).map((item) => (
                <GoalPlate key={item.id} goal={item} />
            ))}
        </div>
    );
};

const Table = () => {
    return (
        <div className={styles["table-container"]}>
            <Wrapper />
        </div>
    );
};

export default Table;

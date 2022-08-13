import * as React from "react";
import { Button, Content, Text } from "../../../../../../components";
import Modal from "../Modal";

import styles from "./Table.module.scss";

type Props = {
    openModal: () => void;
};

const Wrapper: React.FC<Props> = ({ openModal }) => {
    const items = [];

    if (items.length === 0) {
        return (
            <div className={styles.table__empty}>
                <div className={styles["table__empty-wrapper"]}>
                    <Text size="l" color="secondary">
                        У вас нет ни одной цели
                    </Text>
                    <Button onClick={openModal}>
                        <Text size="l">Добавить цель</Text>
                    </Button>
                </div>
            </div>
        );
    }

    return <div></div>;
};

const Table = () => {
    const [showModal, setShowModal] = React.useState(false);

    const toggleShowHandler = React.useCallback(
        () => setShowModal((prev) => !prev),
        []
    );

    return (
        <Content variant="primary" className={styles["table-container"]}>
            <Modal show={showModal} onClose={toggleShowHandler} />
            <Wrapper openModal={toggleShowHandler} />
        </Content>
    );
};

export default Table;

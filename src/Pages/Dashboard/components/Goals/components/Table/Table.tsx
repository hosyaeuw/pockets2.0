import * as React from "react";
import { Button, Content, Text } from "../../../../../../components";
import useModal from "../../../../../common/hooks/useModal";
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
    const { showModal, toggleShowModalHandler } = useModal();

    return (
        <Content variant="primary" className={styles["table-container"]}>
            <Modal show={showModal} onClose={toggleShowModalHandler} />
            <Wrapper openModal={toggleShowModalHandler} />
        </Content>
    );
};

export default Table;

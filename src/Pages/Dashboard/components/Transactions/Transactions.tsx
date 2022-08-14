import * as React from "react";
import { ArrowLink, Button, Content, Text } from "../../../../components";
import { Modal, Table } from "./components";

import styles from "./Transactions.module.scss";

const Transactions = () => {
    const [showModal, setShowModal] = React.useState(false);

    const toggleShowHandler = React.useCallback(
        () => setShowModal((prev) => !prev),
        []
    );

    return (
        <Content
            className={styles.transactions}
            header={
                <div className={styles.transactions__header}>
                    <Text size="l">
                        <b>Операции</b>
                    </Text>
                    <ArrowLink to="transactions" next />
                </div>
            }
        >
            <Modal show={showModal} onClose={toggleShowHandler} />
            <Table />
            <div className={styles["transactions__btn-container"]}>
                <div className={styles.transactions__btn}>
                    <Button onClick={toggleShowHandler}>
                        <Text size="xl">+</Text>
                    </Button>
                </div>
            </div>
        </Content>
    );
};

export default Transactions;

import * as React from "react";
import { ArrowLink, Button, Content, Text } from "../../../../components";
import { Modal, Table } from "./components";

import styles from "./Transactions.module.scss";

const transactionsUrl = "transactions";

const Transactions = () => {
    const isTransactionsUrl = window.location.href.endsWith(transactionsUrl);

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
                    <div className={styles["transactions__header-left"]}>
                        <Text size="l">
                            <b>Операции</b>
                        </Text>
                        {!isTransactionsUrl && (
                            <ArrowLink to={transactionsUrl} next />
                        )}
                    </div>
                    {isTransactionsUrl && (
                        <div className={styles["transactions__header-right"]}>
                            <Content
                                variant="primary"
                                className={styles["file-btn-container"]}
                            >
                                <Button
                                    variant="ghost"
                                    className={styles["file-btn"]}
                                >
                                    <Text color="primary">Импорт</Text>
                                </Button>
                            </Content>
                            <Content
                                variant="primary"
                                className={styles["file-btn-container"]}
                            >
                                <Button
                                    variant="ghost"
                                    className={styles["file-btn"]}
                                >
                                    <Text color="primary">Экспорт</Text>
                                </Button>
                            </Content>
                        </div>
                    )}
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

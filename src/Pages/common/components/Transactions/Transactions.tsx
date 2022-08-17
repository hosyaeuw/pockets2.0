import { ArrowLink, Button, Content, Text } from "../../../../components";
import { paths } from "../../../../router/paths";
import useModal from "../../hooks/useModal";
import { Modal, Table } from "./components";

import styles from "./Transactions.module.scss";

const Transactions = () => {
    const isTransactionsUrl = window.location.href.endsWith(paths.transactions);

    const {showModal, toggleShowModalHandler} = useModal();

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
                            <ArrowLink to={paths.transactions} next />
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
            <Modal show={showModal} onClose={toggleShowModalHandler} />
            <Table />
            <div className={styles["transactions__btn-container"]}>
                <div className={styles.transactions__btn}>
                    <Button onClick={toggleShowModalHandler}>
                        <Text size="xl">+</Text>
                    </Button>
                </div>
            </div>
        </Content>
    );
};

export default Transactions;

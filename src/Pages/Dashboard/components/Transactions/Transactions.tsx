import { Button, Content, Text } from "../../../../components";
import { Table } from "./components";

import styles from "./Transactions.module.scss";

const Transactions = () => {
    return (
        <Content
            className={styles.transactions}
            header={
                <div className={styles.transactions__header}>
                    <Text size="l">
                        <b>Операции</b>
                    </Text>
                </div>
            }
        >
            <Table />
            <div className={styles["transactions__btn-container"]}>
                <div className={styles.transactions__btn}>
                    <Button>
                        <Text size="xl">+</Text>
                    </Button>
                </div>
            </div>
        </Content>
    );
};

export default Transactions;

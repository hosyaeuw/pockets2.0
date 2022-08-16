import PageLayout from "../../components/PageLayout";
import { Statistics } from "./components";
import { Transactions as TransactionsBlock } from "../common/components";

import styles from "./Transactions.module.scss";

const Transactions = () => {
    return (
        <PageLayout title="Операции" prevPath="/">
            <div className={styles.transactions}>
                <Statistics />
                <TransactionsBlock />
            </div>
        </PageLayout>
    );
};

export default Transactions;

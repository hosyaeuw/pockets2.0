import PageLayout from "../../components/PageLayout";
import { Statistics } from "./components";

import styles from "./Transactions.module.scss";

const Transactions = () => {
    return (
        <PageLayout title="Операции" prevPath="/">
            <div className={styles.transactions}>
                <Statistics />
            </div>
        </PageLayout>
    );
};

export default Transactions;

import PageLayout from "../../components/PageLayout";
import { Global, Transactions, Goals } from "./components";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    return (
        <PageLayout
            title={
                <>
                    Привет, <b>Иннокентий</b>
                </>
            }
        >
            <div className={styles.dashboard}>
                <Global />
                <Transactions />
                <Goals />
            </div>
        </PageLayout>
    );
};

export default Dashboard;
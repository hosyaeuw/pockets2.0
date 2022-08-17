import PageLayout from "../../components/PageLayout";
import { Analytics, Goals as GoalsComponent } from "./components";

import styles from "./Goals.module.scss";

const Goals = () => {
    return (
        <PageLayout title="Цели" prevPath="/">
            <div className={styles.goals}>
                <Analytics />
                <GoalsComponent />
            </div>
        </PageLayout>
    );
};

export default Goals;

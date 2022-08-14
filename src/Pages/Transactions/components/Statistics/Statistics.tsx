import { Content } from "../../../../components";
import { Categories, Header } from "./components";

import styles from "./Statistics.module.scss";

const Statistics = () => {
    return (
        <Content className={styles.statistics}>
            <Header />
            <Categories />
        </Content>
    );
};

export default Statistics;

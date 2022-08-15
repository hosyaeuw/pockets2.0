import { Content } from "../../../../components";
import { Categories, Header, Common } from "./components";

import styles from "./Statistics.module.scss";

const Statistics = () => {
    return (
        <Content className={styles.statistics}>
            <Header />
            <div className={styles.statistics__content}>
                <div className={styles.statistics__common}>
                    <Common />
                </div>
                <Categories />
            </div>
        </Content>
    );
};

export default Statistics;

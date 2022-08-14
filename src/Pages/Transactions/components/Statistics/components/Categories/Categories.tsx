import { Text } from "../../../../../../components";
import { Table } from "./components";

import styles from "./Categories.module.scss";

const Categories = () => {
    return (
        <div className={styles.categories}>
            <div className={styles.categories__title}>
                <Text size="s" color="secondary">
                    Расходы по категориям
                </Text>
            </div>
            <Table />
        </div>
    );
};

export default Categories;

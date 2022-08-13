import { Content, Text } from "../../../../../../components";

import styles from "./Table.module.scss";
// TODO: убрать дубликат с целями
const Wrapper: React.FC = () => {
    const items = [];

    if (items.length === 0) {
        return (
            <div className={styles.table__empty}>
                <Text size="l" color="primary">У вас нет ни одной операции</Text>
            </div>
        );
    }

    return <div></div>;
};

const Table = () => {
    return (
        <Content variant="primary" className={styles['table-container']}>
            <Wrapper />
        </Content>
    );
};

export default Table;

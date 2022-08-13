import { Button, Content, Text } from "../../../../../../components";

import styles from "./Table.module.scss";

const Wrapper: React.FC = () => {
    const items = [];

    if (items.length === 0) {
        return (
            <div className={styles.table__empty}>
                <div className={styles["table__empty-wrapper"]}>
                    <Text size="l" color="primary">
                        У вас нет ни одной цели
                    </Text>
                    <Button>
                        <Text size="l">Добавить цель</Text>
                    </Button>
                </div>
            </div>
        );
    }

    return <div></div>;
};

const Table = () => {
    return (
        <Content variant="primary" className={styles["table-container"]}>
            <Wrapper />
        </Content>
    );
};

export default Table;

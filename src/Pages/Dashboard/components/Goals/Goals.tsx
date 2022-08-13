import { Content, Text } from "../../../../components";
import { Table } from "./components";

import styles from "./Goals.module.scss";

const Goals = () => {
    return (
        <Content
            className={styles.goals}
            header={
                <div>
                    <Text size="l">
                        <b>Цели</b>
                    </Text>
                </div>
            }
        >
            <Table />
        </Content>
    );
};

export default Goals;

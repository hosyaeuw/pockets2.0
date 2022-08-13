import { Content, Plate, Text } from "../../../../components";

import styles from "./Global.module.scss";

const Global = () => {
    return (
        <Content
            className={styles.global}
            header={
                <div className={styles.global__header}>
                    <Text size="l">
                        <b>Апрель</b>
                    </Text>
                    &nbsp;&nbsp;
                    <Text size="l" color="primary">
                        2022
                    </Text>
                </div>
            }
        >
            <Plate
                className={styles.global__plate}
                title="Доход"
                rightComponent={
                    <Text size="l">
                        <b>0</b>
                    </Text>
                }
            />
            <Plate
                className={styles.global__plate}
                title="Расход"
                rightComponent={
                    <Text size="l">
                        <b>0</b>
                    </Text>
                }
            />
        </Content>
    );
};

export default Global;

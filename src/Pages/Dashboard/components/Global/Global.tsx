import { Content, Plate, Text } from "../../../../components";
import useTransactions from "../../../../hooks/useTransactions";

import styles from "./Global.module.scss";

const Global = () => {
    const { items, global } = useTransactions();
    console.log(items);
    console.log(global);

    return (
        <Content
            className={styles.global}
            header={
                <div className={styles.global__header}>
                    <Text size="l">
                        <b>Апрель</b>
                    </Text>
                    &nbsp;&nbsp;
                    <Text size="l" color="secondary">
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
                        <b>{global.income}</b>
                    </Text>
                }
            />
            <Plate
                className={styles.global__plate}
                title="Расход"
                rightComponent={
                    <Text size="l">
                        <b>{global.expense}</b>
                    </Text>
                }
            />
        </Content>
    );
};

export default Global;

import { Plate, Text } from "../../../../components";
import useTransactions from "../../hooks/useTransactions";

import styles from "./GlobalPlates.module.scss";

const GlobalPlates = () => {
    const { global } = useTransactions();

    return (
        <div className={styles["global-plates"]}>
            <Plate
                title="Доходы"
                rightComponent={
                    <Text size="l">
                        <b>{global.income}</b>
                    </Text>
                }
            />
            <Plate
                title="Расходы"
                rightComponent={
                    <Text size="l">
                        <b>{global.expense}</b>
                    </Text>
                }
            />
        </div>
    );
};

export default GlobalPlates;

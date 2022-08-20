import * as React from "react";
import { Text } from "../../../../components";
import useGoals from "../../../common/hooks/useGoals";

import styles from "./GlobalGoals.module.scss";

const GlobalGoals = () => {
    const { items } = useGoals();

    const totalSum = React.useMemo(
        () => items.reduce((acc, curr) => acc + +curr.amount, 0),
        [items]
    );

    return (
        <div className={styles["global-goals"]}>
            <Text size="s" color="secondary">
                Отложенно на цели
            </Text>
            <Text size="s">{totalSum}</Text>
        </div>
    );
};

export default GlobalGoals;

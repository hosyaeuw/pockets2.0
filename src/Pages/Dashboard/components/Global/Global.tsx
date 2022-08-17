import React from "react";
import { Content, Text } from "../../../../components";
import { GlobalPlates } from "../../../common/components";
import useCategories from "../../../common/hooks/useCategories";
import useGoals from "../../../common/hooks/useGoals";

import styles from "./Global.module.scss";

// TODO: вынести
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

const MoreExtends = () => {
    const { items } = useCategories();

    const moreExtendsCategory = React.useMemo(
        () => [...items].sort((a, b) => b.amount - a.amount)[0],
        [items]
    );

    return (
        <div className={styles["global-goals"]}>
            <Text size="s" color="secondary">
                Больше всего расходов
            </Text>
            <Text size="s" oneLine>
                {moreExtendsCategory?.name ?? "-"}
            </Text>
        </div>
    );
};

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
                    <Text size="l" color="secondary">
                        2022
                    </Text>
                </div>
            }
        >
            <div className={styles.global__plates}>
                <GlobalPlates />
            </div>
            <div className={styles.global__info}>
                <GlobalGoals />
                <MoreExtends />
            </div>
        </Content>
    );
};

export default Global;

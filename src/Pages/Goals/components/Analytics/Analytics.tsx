import React from "react";
import { Content, Plate, Text } from "../../../../components";
import DateHelper from "../../../../utils/dateHelper";
import useGoals from "../../../common/hooks/useGoals";
import AnalyticsText from "../AnalyticsText";

import styles from "./Analytics.module.scss";

const getPercent = (totalAmount: number, amount: number) => {
    return Math.ceil((amount / totalAmount) * 100);
};

const currDate = new Date();
const Analytics = () => {
    const { items } = useGoals();

    const sortedByImmediate = React.useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    DateHelper.getDateDifferenceDays(
                        currDate,
                        new Date(b.want_close)
                    ) -
                    DateHelper.getDateDifferenceDays(
                        currDate,
                        new Date(a.want_close)
                    )
            ),
        [items]
    );

    const sortedByPercent = React.useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    getPercent(b.total_amount, b.amount) -
                    getPercent(a.total_amount, b.amount)
            ),
        [items]
    );

    const sortedByReplenishmentCount = React.useMemo(
        () =>
            [...items].sort(
                (a, b) => b.replenishmentCount - a.replenishmentCount
            ),
        [items]
    );

    const sumTotalAmountGoals = React.useMemo(
        () => items.reduce((acc, curr) => acc + curr.total_amount, 0),
        [items]
    );

    const sumCurrentAmountGoals = React.useMemo(
        () => items.reduce((acc, curr) => acc + curr.amount, 0),
        [items]
    );

    return (
        <Content className={styles.analytics}>
            <Text size="l">
                <b>Аналитика</b>
            </Text>
            <div className={styles.analytics__plates}>
                <Plate
                    title="Цели"
                    rightComponent={<Text size="l">{sumTotalAmountGoals}</Text>}
                />
                <Plate
                    title="Средств на целях"
                    rightComponent={
                        <Text size="l">{sumCurrentAmountGoals}</Text>
                    }
                />
            </div>
            <div className={styles.analytics__text_top}>
                <AnalyticsText title="Всего доход от %" value={0} />
                <AnalyticsText title="В этом месяце доход от %" value={0} />
                <AnalyticsText
                    title="Ближайшая цель (дней)"
                    value={
                        sortedByImmediate[sortedByImmediate.length - 1]?.name
                    }
                />
            </div>
            <div className={styles.analytics__text_bottom}>
                <AnalyticsText
                    title="Самая успешная категория"
                    value={sortedByPercent[0]?.name}
                />
                <AnalyticsText
                    title="Самая популярная категория"
                    value={sortedByReplenishmentCount[0]?.name}
                />
            </div>
        </Content>
    );
};

export default Analytics;

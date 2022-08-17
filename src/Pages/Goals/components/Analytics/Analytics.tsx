import { Content, Plate, Text } from "../../../../components";

import styles from "./Analytics.module.scss";
// TODO: вынести
const AnalyticsText: React.FC<{ title: string; count: number }> = ({
    title,
    count,
}) => {
    return (
        <div className={styles["analytics-text"]}>
            <Text size="s" color="secondary">
                {title}
            </Text>
            <Text size="s">{count}</Text>
        </div>
    );
};
// TODO: стили в css
const Analytics = () => {
    return (
        <Content className={styles.analytics}>
            <Text size="l">
                <b>Аналитика</b>
            </Text>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <Plate title="Цели" rightComponent={<Text size="l">0</Text>} />
                <Plate
                    title="Средств на целях"
                    rightComponent={<Text size="l">0</Text>}
                />
            </div>
            <div
                style={{
                    borderBottom: "4px solid #17181C",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    marginTop: 30,
                    paddingBottom: 24,
                }}
            >
                <AnalyticsText title="Всего доход от %" count={0} />
                <AnalyticsText title="В этом месяце доход от %" count={0} />
                <AnalyticsText title="Ближайшая цель (дней)" count={0} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginTop: 24,
                }}
            >
                <AnalyticsText title="Самая успешная категория" count={0} />
                <AnalyticsText title="Самая популярная категория" count={0} />
            </div>
        </Content>
    );
};

export default Analytics;

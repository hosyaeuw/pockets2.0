import { Content, Plate, Text } from "../../../../components";
import AnalyticsText from "../AnalyticsText";

import styles from "./Analytics.module.scss";

const Analytics = () => {
    return (
        <Content className={styles.analytics}>
            <Text size="l">
                <b>Аналитика</b>
            </Text>
            <div className={styles.analytics__plates}>
                <Plate title="Цели" rightComponent={<Text size="l">0</Text>} />
                <Plate
                    title="Средств на целях"
                    rightComponent={<Text size="l">0</Text>}
                />
            </div>
            <div className={styles.analytics__text_top}>
                <AnalyticsText title="Всего доход от %" count={0} />
                <AnalyticsText title="В этом месяце доход от %" count={0} />
                <AnalyticsText title="Ближайшая цель (дней)" count={0} />
            </div>
            <div className={styles.analytics__text_bottom}>
                <AnalyticsText title="Самая успешная категория" count={0} />
                <AnalyticsText title="Самая популярная категория" count={0} />
            </div>
        </Content>
    );
};

export default Analytics;

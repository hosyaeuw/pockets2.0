import { Content, Plate, Text } from '../../../../components';
import { AmountHelper } from '../../../../utils/amountHelper';
import useFetchAnalytics from '../../../common/hooks/goals/useFetchAnalyticsGoals';
import AnalyticsText from '../AnalyticsText';

import styles from './Analytics.module.scss';

const Analytics = () => {
    const { data } = useFetchAnalytics();

    return (
        <Content className={styles.analytics}>
            <Text size="l">
                <b>Аналитика</b>
            </Text>
            <div className={styles.analytics__plates}>
                <Plate
                    title="Цели"
                    rightComponent={
                        <Text size="l">{AmountHelper.format(data.open_goal_total)}</Text>
                    }
                />
                <Plate
                    title="Средств на целях"
                    rightComponent={
                        <Text size="l">{AmountHelper.format(data.open_goal_amount)}</Text>
                    }
                />
            </div>
            <div className={styles.analytics__text_top}>
                <AnalyticsText title="Всего доход от %" value={0} />
                <AnalyticsText title="В этом месяце доход от %" value={0} />
                <AnalyticsText title="Ближайшая цель (дней)" value={data.nearest_end_goal_days} />
            </div>
            <div className={styles.analytics__text_bottom}>
                <AnalyticsText
                    title="Самая успешная категория"
                    value={data.most_successful_category?.name}
                />
                <AnalyticsText
                    title="Самая популярная категория"
                    value={data.post_popular_category?.name}
                />
            </div>
        </Content>
    );
};

export default Analytics;

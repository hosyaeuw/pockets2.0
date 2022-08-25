import { Text } from '../../../../components';
import { AmountHelper } from '../../../../utils/amountHelper';
import useFetchAnalytics from '../../../common/hooks/goals/useFetchAnalyticsGoals';

import styles from './GlobalGoals.module.scss';

const GlobalGoals = () => {
    const { data } = useFetchAnalytics();

    return (
        <div className={styles['global-goals']}>
            <Text size="s" color="secondary">
                Отложенно на цели
            </Text>
            <Text size="s">{AmountHelper.format(data.open_goal_amount)}</Text>
        </div>
    );
};

export default GlobalGoals;

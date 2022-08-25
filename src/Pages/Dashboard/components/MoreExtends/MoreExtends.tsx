import { Text } from '../../../../components';
import useFetchMonthlyTransaction from '../../../common/hooks/statistics/useFetchMonthlyTransaction';

import styles from './MoreExtends.module.scss';

const MoreExtends = () => {
    const { data } = useFetchMonthlyTransaction();

    return (
        <div className={styles['more-extends']}>
            <Text size="s" color="secondary">
                Больше всего расходов
            </Text>
            <Text size="s" oneLine>
                {data.most_expensive_category?.name ?? '-'}
            </Text>
        </div>
    );
};

export default MoreExtends;

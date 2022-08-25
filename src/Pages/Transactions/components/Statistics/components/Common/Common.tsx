import * as React from 'react';

import { Text } from '../../../../../../components';
import { GlobalPlates } from '../../../../../common/components';
import useFetchCategories from '../../../../../common/hooks/categories/useFetchCategories';
import useFetchGlobal from '../../../../../common/hooks/transactions/useFetchTransactionsGlobal';
import Graph from '../Graph';

import styles from './Common.module.scss';

const Common = () => {
    const { items: categoryItems } = useFetchCategories();
    const { data } = useFetchGlobal();

    const items = React.useMemo(() => {
        return categoryItems.map(category => ({
            label: category.name,
            value: category.amount,
        }));
    }, [categoryItems]);

    return (
        <div className={styles.common}>
            <div className={styles['common__analytics-text']}>
                <div className={styles.common__title}>
                    <Text size="s" color="secondary">
                        Расходы по категориям
                    </Text>
                </div>
                <GlobalPlates data={data} />
            </div>
            <div className={styles.common__graph}>
                <Graph items={items} />
            </div>
        </div>
    );
};

export default Common;

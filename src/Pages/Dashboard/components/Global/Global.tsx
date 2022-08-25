import { Content, Text } from '../../../../components';
import { GlobalPlates } from '../../../common/components';
import useFetchMonthlyTransaction from '../../../common/hooks/statistics/useFetchMonthlyTransaction';
import GlobalGoals from '../GlobalGoals';
import MoreExtends from '../MoreExtends';

import styles from './Global.module.scss';

const Global = () => {
    const { data } = useFetchMonthlyTransaction();

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
                <GlobalPlates
                    data={{
                        income: data.total_income,
                        expense: data.total_expense,
                    }}
                />
            </div>
            <div className={styles.global__info}>
                <GlobalGoals />
                <MoreExtends />
            </div>
        </Content>
    );
};

export default Global;

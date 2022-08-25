import PageLayout from '../../components/PageLayout';
import { Transactions as TransactionsBlock } from '../common/components';
import DateProvider from '../common/providers/DateProvider';
import { Statistics } from './components';

import styles from './Transactions.module.scss';

const Transactions = () => {
    return (
        <DateProvider>
            <PageLayout title="Операции" prevPath="/">
                <div className={styles.transactions}>
                    <Statistics />
                    <TransactionsBlock />
                </div>
            </PageLayout>
        </DateProvider>
    );
};

export default Transactions;

import { useFetchTransactionsQuery } from '../../../../services/transactions';
import useDateContext from '../../providers/useDateContext';
import { TTransaction } from '../useTransactions';

const defaultItems: TTransaction[] = [];

const useFetchTransactions = () => {
    const { dateStr } = useDateContext();
    const { data, ...other } = useFetchTransactionsQuery(dateStr);

    return {
        items: data?.result ?? defaultItems,
        ...other,
    };
};

export default useFetchTransactions;

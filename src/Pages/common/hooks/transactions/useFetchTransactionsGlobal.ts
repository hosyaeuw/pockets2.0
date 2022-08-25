import { useFetchGlobalQuery } from '../../../../services/transactions';
import useDateContext from '../../providers/useDateContext';
import { TransactionType } from '../useTransactions';

const defaultData: Record<TransactionType, number> = {
    expense: 0,
    income: 0,
};

const useFetchGlobal = () => {
    const { dateStr } = useDateContext();
    const { data, ...other } = useFetchGlobalQuery(dateStr);

    return {
        data: data?.result ?? defaultData,
        ...other,
    };
};

export default useFetchGlobal;

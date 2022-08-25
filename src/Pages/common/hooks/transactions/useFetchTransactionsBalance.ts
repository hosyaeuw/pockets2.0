import { useFetchBalanceQuery } from '../../../../services/transactions';
import { TTransactionsBalance } from '../useTransactions';

const defaultData: TTransactionsBalance = {
    balance: 0,
};

const useFetchBalance = () => {
    const { data, ...other } = useFetchBalanceQuery(null);

    return {
        data: data?.result ?? defaultData,
        ...other,
    };
};

export default useFetchBalance;

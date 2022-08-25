import {
    TMonthlyTransaction,
    useFetchMonthlyTransactionQuery,
} from '../../../../services/statistics';

const defaultData: TMonthlyTransaction = {
    total_income: 0,
    total_expense: 0,
    month_income_goals: 0,
    most_expensive_category: null,
};

const useFetchMonthlyTransaction = () => {
    const { data, ...other } = useFetchMonthlyTransactionQuery('');

    return {
        data: data?.result ?? defaultData,
        ...other,
    };
};

export default useFetchMonthlyTransaction;

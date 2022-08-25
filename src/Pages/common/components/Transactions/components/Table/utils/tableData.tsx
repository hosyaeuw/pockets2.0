import { Text } from '../../../../../../../components';
import { AmountHelper } from '../../../../../../../utils/amountHelper';
import { TTransaction } from '../../../../../hooks/useTransactions';

const tableData = (data: TTransaction[]) => {
    return data.map(item => ({
        date: <Text>{new Date(item.transaction_date).toLocaleDateString()}</Text>,
        category: <Text>{item.category?.name || 'Доход'}</Text>,
        amount: <Text>{AmountHelper.format(item.amount)}</Text>,
    }));
};

export default tableData;

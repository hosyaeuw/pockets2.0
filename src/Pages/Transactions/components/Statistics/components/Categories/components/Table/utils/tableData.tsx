import { Text } from '../../../../../../../../../components';
import { AmountHelper } from '../../../../../../../../../utils/amountHelper';
import { TCategory } from '../../../../../../../../common/hooks/useCategories';

const tableData = (data: TCategory[]) => {
    return data.map(item => ({
        category: <Text>{item.name}</Text>,
        amount: <Text>{AmountHelper.format(item.amount)}</Text>,
    }));
};

export default tableData;

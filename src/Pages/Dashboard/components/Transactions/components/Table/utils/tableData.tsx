import { Text } from "../../../../../../../components";
import { TTransaction } from "../../../../../../../hooks/useTransactions";

const tableData = (data: TTransaction[]) => {
    return data.map((item) => ({
        date: <Text>{item.date}</Text>,
        category: <Text>{item.category?.name || "Доход"}</Text>,
        amount: <Text>{item.amount}</Text>,
    }));
};

export default tableData;

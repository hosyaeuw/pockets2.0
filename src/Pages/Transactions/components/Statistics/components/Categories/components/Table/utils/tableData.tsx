import { Text } from "../../../../../../../../../components";
import { TCategory } from "../../../../../../../../common/hooks/useCategories";

const tableData = (data: TCategory[]) => {
    return data.map((item) => ({
        category: <Text>{item.name}</Text>,
        amount: <Text>{item.amount}</Text>,
    }));
};

export default tableData;

import { Text } from "../../../../../../../../../components";
import { TCategory } from "../../../../../../../../../hooks/useCategories";

const tableData = (data: TCategory[]) => {
    return data.map((item) => ({
        category: <Text>{item.name}</Text>,
        amount: <Text>0</Text>,
    }));
};

export default tableData;

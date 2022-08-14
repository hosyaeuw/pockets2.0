import { Text } from "../../../../../../../components";

const columns = [
    {
        Header: <Text>Дата</Text>,
        accessor: "date",
    },
    {
        Header: <Text>Категория</Text>,
        accessor: "category",
    },
    {
        Header: <Text>Сумма</Text>,
        accessor: "amount",
    },
];

export default columns;

import { useTable } from 'react-table';

import { Content, Spin, Text } from '../../../../../../components';
import useFetchTransactions from '../../../../hooks/transactions/useFetchTransactions';
import { TableBody, TableHeader } from './components';
import { columns, tableData } from './utils';

import styles from './Table.module.scss';

const Wrapper: React.FC = () => {
    const { items, isLoading } = useFetchTransactions();

    const tData = tableData(items);

    const tableInstance = useTable<any>({ columns, data: tData });

    if (isLoading) {
        return (
            <div className={styles.table__empty}>
                <Spin />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.table__empty}>
                <Text size="l" color="secondary">
                    У вас нет ни одной операции
                </Text>
            </div>
        );
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <table className={styles.table} {...getTableProps()}>
            <TableHeader headerGroups={headerGroups} />
            <TableBody getTableBodyProps={getTableBodyProps} rows={rows} prepareRow={prepareRow} />
        </table>
    );
};

const Table = () => {
    return (
        <Content variant="primary" className={styles['table-container']}>
            <Wrapper />
        </Content>
    );
};

export default Table;

import React from "react";
import { useTable } from "react-table";

import { Button, Content, Text } from "../../../../../../../../components";
import useCategories from "../../../../../../../../hooks/useCategories";
import Modal from "../Modal";
import { TableBody, TableHeader } from "./components";

import { columns, tableData } from "./utils";

import styles from "./Table.module.scss";

type Props = {
    openModal: () => void;
};

const Wrapper: React.FC<Props> = ({ openModal }) => {
    const { items } = useCategories();
    // TODO: после добавления апи в useMemo?
    const data = tableData(items);

    const tableInstance = useTable<any>({ columns, data });

    if (items.length === 0) {
        return (
            <div className={styles["empty-container"]}>
                <div className={styles.empty}>
                    <Text color="secondary">У вас нет ни одной категории</Text>
                    <Button onClick={openModal}>
                        <Text>Добавить категорию</Text>
                    </Button>
                </div>
            </div>
        );
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <>
            <table className={styles.table} {...getTableProps()}>
                <TableHeader headerGroups={headerGroups} />
                <TableBody
                    getTableBodyProps={getTableBodyProps}
                    rows={rows}
                    prepareRow={prepareRow}
                />
            </table>
            <div className={styles["table__btn-container"]}>
                <Button
                    variant="ghost"
                    className={styles["table__btn"]}
                    onClick={openModal}
                >
                    <Text color="primary" className={styles["table__btn-text"]}>
                        Добавить категорию
                        <Text
                            size="l"
                            color="primary"
                            align="center"
                            className={styles["table__btn-plus"]}
                        >
                            +
                        </Text>
                    </Text>
                </Button>
            </div>
        </>
    );
};
// TODO: вынести это враимодействие с модалками в хук
const Table = () => {
    const [showModal, setShowModal] = React.useState(false);

    const toggleShowHandler = React.useCallback(
        () => setShowModal((prev) => !prev),
        []
    );

    return (
        <Content variant="primary" className={styles["table-container"]}>
            <Modal onClose={toggleShowHandler} show={showModal} />
            <Wrapper openModal={toggleShowHandler} />
        </Content>
    );
};

export default Table;

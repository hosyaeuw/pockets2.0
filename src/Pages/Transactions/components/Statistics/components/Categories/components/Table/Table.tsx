import { useTable } from "react-table";

import { Button, Content, Text } from "../../../../../../../../components";
import Modal from "../Modal";
import { TableBody, TableHeader } from "./components";

import { columns, tableData } from "./utils";

import styles from "./Table.module.scss";
import useCategories from "../../../../../../../common/hooks/useCategories";
import useModal from "../../../../../../../common/hooks/useModal";

type Props = {
    openModal: () => void;
};

const Wrapper: React.FC<Props> = ({ openModal }) => {
    const { items } = useCategories();

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

const Table = () => {
    const { showModal, toggleShowModalHandler } = useModal();

    return (
        <Content variant="primary" className={styles["table-container"]}>
            <Modal onClose={toggleShowModalHandler} show={showModal} />
            <Wrapper openModal={toggleShowModalHandler} />
        </Content>
    );
};

export default Table;

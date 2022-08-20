import classNames from "classnames";
import { Row, TablePropGetter, TableProps } from "react-table";

import styles from "./TableBody.module.scss";

type Props = {
    getTableBodyProps: (
        propGetter?: TablePropGetter<any> | undefined
    ) => TableProps;
    rows: Row<any>[];
    prepareRow: (row: Row<any>) => void;
};

const TableBody: React.FC<Props> = ({
    getTableBodyProps,
    rows,
    prepareRow,
}) => {
    const { className: tableClassName, ...restTableProps } =
        getTableBodyProps();
    return (
        <tbody
            {...restTableProps}
            className={classNames(tableClassName, styles.tbody)}
        >
            {rows.map((row) => {
                prepareRow(row);
                const { className: rowClassName, ...restRowProps } =
                    row.getRowProps();
                return (
                    <tr
                        {...restRowProps}
                        className={classNames(rowClassName, styles.row)}
                    >
                        {row.cells.map((cell) => {
                            const {
                                className: cellClassName,
                                ...restRowProps
                            } = cell.getCellProps();
                            return (
                                <td
                                    {...restRowProps}
                                    className={classNames(
                                        cellClassName,
                                        styles.cell
                                    )}
                                >
                                    {cell.render("Cell")}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;

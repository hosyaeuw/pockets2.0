import classNames from "classnames";
import React from "react";
import { HeaderGroup } from "react-table";

import styles from "./TableHeader.module.scss";

type Props = {
    headerGroups: HeaderGroup<any>[];
};

const TableHeader: React.FC<Props> = ({ headerGroups }) => {
    return (
        <thead className={styles.header}>
            {headerGroups.map((headerGroup) => {
                const { className: groupClassName, ...restGroupProps } =
                    headerGroup.getHeaderGroupProps();

                return (
                    <tr
                        {...restGroupProps}
                        className={classNames(groupClassName, styles.row)}
                    >
                        {headerGroup.headers.map((column) => {
                            const {
                                className: columnClassName,
                                ...restColumnProps
                            } = column.getHeaderProps();
                            return (
                                <th
                                    {...restColumnProps}
                                    className={classNames(columnClassName, styles.cell)}
                                >
                                    {column.render("Header")}
                                </th>
                            );
                        })}
                    </tr>
                );
            })}
        </thead>
    );
};

export default TableHeader;

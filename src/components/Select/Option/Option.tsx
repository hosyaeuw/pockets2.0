import classNames from "classnames";
import * as React from "react";
import styles from "./Option.module.scss";

type Props = {
    children?: React.ReactNode;
    value: any;
    onClick?: (value: any) => void;
    selected?: boolean;
};

export type OptionComponent = React.FC<Props>;

const Option: OptionComponent = ({ children, value, selected, onClick }) => {
    const onClickHandler = React.useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onClick && onClick(value);
        },
        [onClick, value]
    );

    return (
        <div
            onClick={onClickHandler}
            className={classNames(styles.option, {
                [styles.option_selected]: selected,
            })}
        >
            {children}
        </div>
    );
};

export default Option;

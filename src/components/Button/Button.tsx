import classNames from "classnames";

import styles from "./Button.module.scss";

type Props = {
    className?: string;
    onClick?: () => void;
};

const Button: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    className,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={classNames(styles.button, className)}
        >
            {children}
        </button>
    );
};

export default Button;

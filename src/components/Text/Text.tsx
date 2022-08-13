import classNames from "classnames";

import styles from "./Text.module.scss";

type Props = {
    color?: "default" | "primary";
    size?: "s" | "m" | "l" | "xl";
    className?: string;
};

const Text: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    color = "default",
    size = "m",
    className,
}) => {
    return (
        <span
            className={classNames(
                styles[`color__${color}`],
                styles[`size__${size}`],
                className
            )}
        >
            {children}
        </span>
    );
};

export default Text;

import classNames from "classnames";
import styles from "./Content.module.scss";

type Props = {
    className?: string;
    variant?: "default" | "primary";
    header?: React.ReactNode;
};

const Content: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    className,
    variant = "default",
    header,
}) => {
    return (
        <div
            className={classNames([styles.content, styles[variant], className])}
        >
            {!!header && <div className={styles.content__header}>{header}</div>}
            {children}
        </div>
    );
};

export default Content;

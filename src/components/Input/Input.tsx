import classNames from "classnames";
import Text from "../Text";
import styles from "./Input.module.scss";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    error?: string;
    className?: string;
};

const Input: React.FC<Props> = ({ error, className, ...other }) => {
    return (
        <div
            className={classNames(styles["input-container"], className, {
                [styles.input_error]: error,
            })}
        >
            {error && (
                <div className={styles.input__error}>
                    <Text>{error}</Text>
                </div>
            )}
            <input {...other} className={styles.input} />
        </div>
    );
};

export default Input;

import classNames from 'classnames';

import Text from '../Text';

import styles from './Input.module.scss';

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    error?: string;
    className?: string;
    getRef?: (c: HTMLInputElement) => void;
};

const Input: React.FC<Props> = ({ error, className, getRef, ...other }) => {
    return (
        <div
            className={classNames(styles['input-container'], className, {
                [styles.input_error]: error,
            })}
        >
            {error && (
                <div className={styles.input__error}>
                    <Text>{error}</Text>
                </div>
            )}
            <input
                ref={c => {
                    c && getRef && getRef(c);
                }}
                {...other}
                className={styles.input}
            />
        </div>
    );
};

export default Input;

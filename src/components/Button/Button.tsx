import classNames from 'classnames';

import Spin from '../Spin';

import styles from './Button.module.scss';

type Props = {
    className?: string;
    onClick?: () => void;
    size?: 's' | 'm';
    variant?: 'default' | 'ghost' | 'secondary';
    type?: 'button' | 'submit';
    loading?: boolean;
};

const Button: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    className,
    onClick,
    size = 'm',
    variant = 'default',
    type = 'button',
    loading,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                styles.button,
                styles[`size__${size}`],
                styles[`variant__${variant}`],
                className,
                {
                    [styles.button_loading]: loading,
                },
            )}
        >
            {loading && <Spin size="small" />}
            {children}
        </button>
    );
};

export default Button;

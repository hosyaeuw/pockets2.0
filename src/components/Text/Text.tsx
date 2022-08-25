import classNames from 'classnames';

import styles from './Text.module.scss';

type Props = {
    color?: 'default' | 'secondary' | 'primary' | 'danger';
    size?: 's' | 'm' | 'l' | 'xl';
    className?: string;
    align?: 'left' | 'right' | 'center';
    oneLine?: boolean;
};

const Text: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    color = 'default',
    size = 'm',
    align = 'left',
    className,
    oneLine,
}) => {
    return (
        <span
            className={classNames(
                styles[`color__${color}`],
                styles[`size__${size}`],
                styles[`align__${align}`],
                className,
                {
                    [styles['one-line']]: oneLine,
                },
            )}
        >
            {children}
        </span>
    );
};

export default Text;

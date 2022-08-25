import classNames from 'classnames';

import styles from './Spin.module.scss';

type Props = {
    size?: 'small' | 'medium' | 'large';
};

const Spin: React.FC<Props> = ({ size = 'medium' }) => {
    return (
        <div className={classNames(styles.loader, styles[`size_${size}`])}>
            <span></span>
        </div>
    );
};

export default Spin;

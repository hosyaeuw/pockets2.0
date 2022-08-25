import useFetchBalance from '../../Pages/common/hooks/transactions/useFetchTransactionsBalance';
import { AmountHelper } from '../../utils/amountHelper';
import ArrowLink from '../ArrowLink';
import Text from '../Text';

import styles from './Header.module.scss';

type Props = {
    title: string | React.ReactNode;
    prevPath?: string;
};

const Header: React.FC<Props> = ({ title, prevPath }) => {
    const { data } = useFetchBalance();

    return (
        <div className={styles.header}>
            <div className={styles.header__left}>
                {prevPath && <ArrowLink to={prevPath} />}
                <Text size="xl">{title}</Text>
            </div>
            <div className={styles.header__right}>
                <Text className={styles.header__amount} align="right" size="xl">
                    <b>{AmountHelper.format(data.balance)}</b>
                </Text>
                <Text size="s" color="secondary">
                    На счету
                </Text>
            </div>
        </div>
    );
};

export default Header;

import ArrowLink from "../ArrowLink";
import Text from "../Text";
import styles from "./Header.module.scss";

type Props = {
    title: string | React.ReactNode;
    prevPath?: string;
};

const Header: React.FC<Props> = ({ title, prevPath }) => {
    return (
        <div className={styles.header}>
            <div className={styles.header__left}>
                {prevPath && <ArrowLink to={prevPath} />}
                <Text size="xl">{title}</Text>
            </div>
            <div className={styles.header__right}>
                <Text className={styles.header__amount} size="xl">
                    <b>0</b>
                </Text>
                <Text size="s" color="secondary">
                    На счету
                </Text>
            </div>
        </div>
    );
};

export default Header;

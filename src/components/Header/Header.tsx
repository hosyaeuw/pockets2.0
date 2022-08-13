import Text from "../Text";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <Text size="xl">Привет, <b>Иннокентий</b></Text>
            <div className={styles.header__right}>
                <Text className={styles.header__amount} size="xl"><b>0</b></Text>
                <Text size="s" color="secondary">На счету</Text>
            </div>
        </div>
    );
};

export default Header;

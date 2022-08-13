import classNames from "classnames";
import Text from "../Text";
import styles from "./Plate.module.scss";

type Props = {
    title: string;
    rightComponent?: React.ReactNode;
    className?: string;
};

const Plate: React.FC<Props> = ({ title, rightComponent, className }) => {
    return (
        <div className={classNames(styles.plate, className)}>
            <Text color="primary">{title}</Text>
            {rightComponent}
        </div>
    );
};

export default Plate;

import classNames from "classnames";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../../assets";
import Text from "../Text";

import styles from "./ArrowLink.module.scss";

type Props = {
    to: string;
    next?: boolean;
};

const ArrowLink: React.FC<Props> = ({ to, next }) => {
    return (
        <Link to={to}>
            <Text
                size="xl"
                color="primary"
                className={classNames(styles.btn, {
                    [styles.btn_next]: next,
                })}
            >
                <ArrowIcon />
            </Text>
        </Link>
    );
};

export default ArrowLink;

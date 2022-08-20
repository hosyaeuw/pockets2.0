import { Text } from "../../../../components";

import styles from "./AnalyticsText.module.scss";

type Props = {
    title: string;
    count: number;
};

const AnalyticsText: React.FC<Props> = ({ title, count }) => {
    return (
        <div className={styles["analytics-text"]}>
            <Text size="s" color="secondary">
                {title}
            </Text>
            <Text size="s">{count}</Text>
        </div>
    );
};

export default AnalyticsText;

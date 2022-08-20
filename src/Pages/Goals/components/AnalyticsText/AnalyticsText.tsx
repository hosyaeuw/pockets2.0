import { Text } from "../../../../components";

import styles from "./AnalyticsText.module.scss";

type Props = {
    title: string;
    value?: number | string;
};

const AnalyticsText: React.FC<Props> = ({ title, value }) => {
    return (
        <div className={styles["analytics-text"]}>
            <Text size="s" color="secondary">
                {title}
            </Text>
            <Text size="s">{value ?? "-"}</Text>
        </div>
    );
};

export default AnalyticsText;

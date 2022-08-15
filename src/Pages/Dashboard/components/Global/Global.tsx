import { Content, Text } from "../../../../components";
import { GlobalPlates } from "../../../common/components";

import styles from "./Global.module.scss";

const Global = () => {
    return (
        <Content
            className={styles.global}
            header={
                <div className={styles.global__header}>
                    <Text size="l">
                        <b>Апрель</b>
                    </Text>
                    &nbsp;&nbsp;
                    <Text size="l" color="secondary">
                        2022
                    </Text>
                </div>
            }
        >
            <GlobalPlates />
        </Content>
    );
};

export default Global;

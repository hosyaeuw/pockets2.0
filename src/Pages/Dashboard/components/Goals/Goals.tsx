import { ArrowLink, Content, Text } from "../../../../components";
import { paths } from "../../../../router/paths";
import { GoalList } from "./components";

import styles from "./Goals.module.scss";

const Goals = () => {
    return (
        <Content
            className={styles.goals}
            header={
                <div>
                    <div className={styles.goals__header}>
                        <Text size="l">
                            <b>Цели</b>
                        </Text>
                        <ArrowLink to={paths.goals} next />
                    </div>
                </div>
            }
        >
            <GoalList />
        </Content>
    );
};

export default Goals;

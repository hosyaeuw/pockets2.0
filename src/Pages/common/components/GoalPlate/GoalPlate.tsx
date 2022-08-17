import React from "react";
import { Content, Text } from "../../../../components";
import { TGoal } from "../../hooks/useGoals";
import Graph from "./Graph";

import styles from "./GoalPlate.module.scss";

const GoalPlate: React.FC<{ goal: TGoal }> = ({ goal }) => {
    return (
        <Content variant="primary" className={styles["goal-plate"]}>
            <Graph amount={goal.amount} totalAmount={goal.total_amount} />
            <div className={styles["goal-plate__content"]}>
                <Text oneLine color="secondary">
                    {goal.name}
                </Text>
                <Text>
                    <b>{goal.amount}</b> / {goal.total_amount}
                </Text>
            </div>
        </Content>
    );
};

export default GoalPlate;

import * as React from "react";
import { Button, Content, Text } from "../../../../../../components";
import DateHelper from "../../../../../../utils/dateHelper";
import { GoalPlate } from "../../../../../common/components";
import { TGoal } from "../../../../../common/hooks/useGoals";

import styles from "./GoalCard.module.scss";

type Props = {
    item: TGoal;
    onClick: () => void;
};

const GoalCardText: React.FC<{ title: string; count: string | number }> = ({
    title,
    count,
}) => {
    return (
        <div className={styles["goal-card__text"]}>
            <Text color="secondary" size="s">
                {title}
            </Text>
            <Text size="s">{count}</Text>
        </div>
    );
};

const GoalCard: React.FC<Props> = ({ item, onClick }) => {
    const daysToFinishGoal = React.useMemo(
        () =>
            DateHelper.getDateDifferenceDays(
                new Date(),
                new Date(item.want_close)
            ),
        [item]
    );

    return (
        <Content variant="primary" className={styles["goal-card"]}>
            <GoalPlate goal={item} />
            <div className={styles["goal-card__info"]}>
                <GoalCardText title="В прошлом месяце" count={0} />
                <GoalCardText title="Ставка" count={`${item.percent}%`} />
                <GoalCardText
                    title="Осталось дней"
                    count={daysToFinishGoal.toFixed()}
                />
            </div>
            <div className={styles["goal-card__btn-container"]}>
                <Button onClick={onClick}>
                    <Text size="l">Пополнить</Text>
                </Button>
            </div>
        </Content>
    );
};

export default GoalCard;

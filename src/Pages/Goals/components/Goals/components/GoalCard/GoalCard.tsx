import { EllipsisIcon } from "../../../../../../assets";
import { Button, Content, Text } from "../../../../../../components";
import { GoalPlate } from "../../../../../common/components";
import { TGoal } from "../../../../../common/hooks/useGoals";

import styles from "./GoalCard.module.scss";

type Props = {
    item: TGoal;
};

const GoalCardText: React.FC<{ title: string; count: string | number }> = ({
    title,
    count,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Text color="secondary" size="s">
                {title}
            </Text>
            <Text size="s">{count}</Text>
        </div>
    );
};

const GoalCard: React.FC<Props> = ({ item }) => {
    return (
        <Content variant="primary" className={styles["goal-cart"]}>
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: 34,
                    width: 34,
                    background: "#17181C",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button variant="ghost">
                    <div
                        style={{
                            height: 24,
                            width: 24,
                            background: "#1D2023",
                            borderRadius: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <EllipsisIcon />
                    </div>
                </Button>
            </div>
            <GoalPlate goal={item} />
            <div
                style={{
                    height: 92,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "16px 0",
                }}
            >
                <GoalCardText title="В прошлом месяце" count={0} />
                <GoalCardText title="Ставка" count={`${0}%`} />
                <GoalCardText title="Осталось дней" count={1200} />
            </div>
            <div
                style={{
                    padding: "0 20px",
                }}
            >
                <Button>
                    <Text size="l">Пополнить</Text>
                </Button>
            </div>
        </Content>
    );
};

export default GoalCard;

// TODO: переименовать компонент
import * as React from "react";
import { Button, Content, Text } from "../../../../../../components";
import useGoals, { TGoal } from "../../../../../common/hooks/useGoals";
import useModal from "../../../../../common/hooks/useModal";
import Modal from "../Modal";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";

import styles from "./Table.module.scss";
import { colors } from "../../../../../../utils/graph";
import RandomHelper from "../../../../../../utils/randomHelper";

type Props = {};
// TODO: вынести
const Graph: React.FC<{ totalAmount: number; amount: number }> = ({
    totalAmount,
    amount,
}) => {
    const color = RandomHelper.choice(colors);

    const data = {
        labels: ["Red", "Blue"],
        datasets: [
            {
                yAxisID: "yAxes",
                label: "# of Votes",
                data: [amount, totalAmount - amount],
                backgroundColor: [color, "#1D2023"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        cutout: 95,
    };

    const plugins = [
        {
            id: "text",
            beforeDraw: (chart: Chart) => {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                ctx.restore();
                ctx.font = "3em Verdana";
                ctx.fillStyle = color;
                ctx.textBaseline = "top";
                const text = `${((amount / totalAmount) * 100).toFixed()}%`;
                const textX = Math.round(
                    (width - ctx.measureText(text).width) / 2
                );
                const fontHeight = `${ctx.font}`.replace(/[^\d.]/g, "");
                const textY = height / 2 - +fontHeight / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            },
        },
    ];

    return (
        <Doughnut
            className={styles.graph}
            data={data}
            options={options}
            plugins={plugins}
        />
    );
};

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

const Wrapper: React.FC<Props> = () => {
    const { items } = useGoals();

    const { showModal, toggleShowModalHandler } = useModal();

    const sortedItemsByPercent = React.useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    (b.amount / b.total_amount) * 100 -
                    (a.amount / a.total_amount) * 100
            ),
        [items]
    );

    if (items.length === 0) {
        return (
            <Content
                variant="primary"
                className={styles["table__empty-container"]}
            >
                <Modal show={showModal} onClose={toggleShowModalHandler} />
                <div className={styles.table__empty}>
                    <div className={styles["table__empty-wrapper"]}>
                        <Text size="l" color="secondary">
                            У вас нет ни одной цели
                        </Text>
                        <Button onClick={toggleShowModalHandler}>
                            <Text size="l">Добавить цель</Text>
                        </Button>
                    </div>
                </div>
            </Content>
        );
    }

    return (
        <div
            style={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 6,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: -200,
                }}
                onClick={toggleShowModalHandler}
            >
                <Modal show={showModal} onClose={toggleShowModalHandler} />
                <Text>ADD MODAL</Text>
            </div>
            {sortedItemsByPercent.slice(0, 3).map((item) => (
                <GoalPlate key={item.id} goal={item} />
            ))}
        </div>
    );
};

const Table = () => {
    return (
        <div className={styles["table-container"]}>
            <Wrapper />
        </div>
    );
};

export default Table;

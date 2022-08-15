import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Text } from "../../../../../../components";
import { GlobalPlates } from "../../../../../common/components";
import useCategories from "../../../../../common/hooks/useCategories";

import styles from "./Common.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#28C76F", "#ED3AC6", "#F9F023", "#5D5FEF"];

type GraphItem = {
    label: string;
    value: number;
};

const Graph: React.FC<{ items: GraphItem[] }> = ({ items }) => {
    const sortedItems = items.sort((a, b) => b.value - a.value);

    const labelsTotal = sortedItems.map((item) => item.label);
    const valuesTotal = sortedItems.map((item) => item.value);

    const resultLabel: string[] = labelsTotal.slice(0, 3);
    const resultValues: number[] = valuesTotal.slice(0, 3);

    if (items.length > 3) {
        resultLabel.push("Другое");
        resultValues.push(
            valuesTotal.slice(3).reduce((acc, curr) => acc + curr, 0)
        );
    }

    const data = {
        labels: resultLabel,
        datasets: [
            {
                data: resultValues,
                backgroundColor: colors,
                borderWidth: 0,
            },
        ],
    };

    return (
        <Pie
            className={styles.graph}
            data={data}
            options={{
                plugins: {
                    legend: {
                        position: "right",
                    },
                },
            }}
        />
    );
};
// TODO: разделить плашки, график и т.д.
const Common = () => {
    const { items: categoryItems } = useCategories();

    const items = React.useMemo(() => {
        return categoryItems.map((category) => ({
            label: category.name,
            value: category.amount,
        }));
    }, [categoryItems]);

    return (
        <div className={styles.common}>
            <div>
                <div className={styles.common__title}>
                    <Text size="s" color="secondary">
                        Расходы по категориям
                    </Text>
                </div>
                <GlobalPlates />
            </div>
            <div className={styles.common__graph}>
                <Graph items={items} />
            </div>
        </div>
    );
};

export default Common;

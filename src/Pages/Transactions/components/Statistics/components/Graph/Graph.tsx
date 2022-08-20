import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { colors } from "../../../../../../utils/graph";

ChartJS.register(ArcElement, Tooltip, Legend);

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

export default Graph;
